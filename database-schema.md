# Estrutura do Banco de Dados - SurgFlow

## Visão Geral
Este documento define a estrutura do banco de dados para o sistema SurgFlow, incluindo tabelas para usuários, planos, assinaturas e sessões.

## Tabelas

### 1. users (Usuários)
Armazena informações dos usuários registrados no sistema.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    crm VARCHAR(20),
    specialty VARCHAR(100),
    institution VARCHAR(255),
    current_plan_id UUID REFERENCES plans(id),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_current_plan ON users(current_plan_id);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. plans (Planos)
Define os diferentes planos de assinatura disponíveis.

```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    features JSONB, -- Array de features disponíveis no plano
    max_users INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais
INSERT INTO plans (name, slug, description, price_monthly, price_yearly, features) VALUES
('Teste', 'teste', 'Plano gratuito com acesso básico', 0.00, 0.00, '["cholecystitis_guideline", "basic_calculators"]'),
('GuideFlow', 'guideflow', 'Acesso completo aos fluxogramas e calculadoras', 29.90, 299.00, '["all_guidelines", "all_calculators", "clinical_cases", "priority_support"]'),
('MindFlow', 'mindflow', 'Plano premium com comunidade exclusiva', 49.90, 499.00, '["all_guidelines", "all_calculators", "clinical_cases", "vip_whatsapp", "exclusive_content", "research_support", "priority_support"]');
```

### 3. subscriptions (Assinaturas)
Gerencia as assinaturas ativas dos usuários.

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, cancelled, expired, pending
    billing_cycle VARCHAR(10) NOT NULL, -- monthly, yearly
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    payment_method VARCHAR(50), -- credit_card, pix, boleto
    external_subscription_id VARCHAR(255), -- ID do gateway de pagamento
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_ends_at ON subscriptions(ends_at);
```

### 4. user_sessions (Sessões de Usuário)
Gerencia as sessões ativas dos usuários para controle de autenticação.

```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    device_info JSONB, -- Informações do dispositivo/navegador
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
```

### 5. payment_transactions (Transações de Pagamento)
Registra todas as transações de pagamento.

```sql
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    subscription_id UUID REFERENCES subscriptions(id),
    external_transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    status VARCHAR(20) NOT NULL, -- pending, completed, failed, refunded
    payment_method VARCHAR(50) NOT NULL,
    gateway VARCHAR(50) NOT NULL, -- stripe, mercadopago, etc
    gateway_response JSONB,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_transactions_status ON payment_transactions(status);
CREATE INDEX idx_transactions_created_at ON payment_transactions(created_at);
```

### 6. user_activity_logs (Logs de Atividade)
Registra atividades importantes dos usuários para auditoria e analytics.

```sql
CREATE TABLE user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- login, logout, view_guideline, use_calculator, etc
    resource_type VARCHAR(50), -- guideline, calculator, clinical_case
    resource_id VARCHAR(100),
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON user_activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON user_activity_logs(created_at);
```

### 7. feature_access_control (Controle de Acesso a Features)
Define quais features cada plano pode acessar de forma granular.

```sql
CREATE TABLE feature_access_control (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES plans(id),
    feature_key VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    usage_limit INTEGER, -- NULL = ilimitado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE UNIQUE INDEX idx_feature_access_plan_feature ON feature_access_control(plan_id, feature_key);

-- Dados iniciais
INSERT INTO feature_access_control (plan_id, feature_key, is_enabled, usage_limit) VALUES
-- Plano Teste
((SELECT id FROM plans WHERE slug = 'teste'), 'cholecystitis_guideline', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'teste'), 'basic_calculators', TRUE, 5),

-- Plano GuideFlow
((SELECT id FROM plans WHERE slug = 'guideflow'), 'all_guidelines', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'guideflow'), 'all_calculators', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'guideflow'), 'clinical_cases', TRUE, NULL),

-- Plano MindFlow
((SELECT id FROM plans WHERE slug = 'mindflow'), 'all_guidelines', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'mindflow'), 'all_calculators', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'mindflow'), 'clinical_cases', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'mindflow'), 'vip_whatsapp', TRUE, NULL),
((SELECT id FROM plans WHERE slug = 'mindflow'), 'exclusive_content', TRUE, NULL);
```

## Relacionamentos

### Principais Relacionamentos:
1. **users.current_plan_id** → **plans.id** (Many-to-One)
2. **subscriptions.user_id** → **users.id** (Many-to-One)
3. **subscriptions.plan_id** → **plans.id** (Many-to-One)
4. **user_sessions.user_id** → **users.id** (Many-to-One)
5. **payment_transactions.user_id** → **users.id** (Many-to-One)
6. **user_activity_logs.user_id** → **users.id** (Many-to-One)
7. **feature_access_control.plan_id** → **plans.id** (Many-to-One)

## Triggers e Funções

### 1. Atualizar timestamp de updated_at
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar aos triggers necessários
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Atualizar plano do usuário baseado na assinatura ativa
```sql
CREATE OR REPLACE FUNCTION update_user_current_plan()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando uma assinatura é criada ou ativada
    IF NEW.status = 'active' THEN
        UPDATE users 
        SET current_plan_id = NEW.plan_id 
        WHERE id = NEW.user_id;
    END IF;
    
    -- Quando uma assinatura é cancelada ou expira
    IF NEW.status IN ('cancelled', 'expired') THEN
        -- Verificar se há outras assinaturas ativas
        IF NOT EXISTS (
            SELECT 1 FROM subscriptions 
            WHERE user_id = NEW.user_id 
            AND status = 'active' 
            AND id != NEW.id
        ) THEN
            -- Voltar para plano teste
            UPDATE users 
            SET current_plan_id = (SELECT id FROM plans WHERE slug = 'teste')
            WHERE id = NEW.user_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_plan_on_subscription_change 
    AFTER INSERT OR UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_user_current_plan();
```

## Consultas Úteis

### 1. Verificar acesso a feature
```sql
SELECT 
    u.id,
    u.email,
    p.name as plan_name,
    fac.feature_key,
    fac.is_enabled,
    fac.usage_limit
FROM users u
JOIN plans p ON u.current_plan_id = p.id
JOIN feature_access_control fac ON p.id = fac.plan_id
WHERE u.id = $1 AND fac.feature_key = $2;
```

### 2. Listar usuários com assinaturas ativas
```sql
SELECT 
    u.id,
    u.email,
    u.full_name,
    p.name as plan_name,
    s.status,
    s.ends_at
FROM users u
JOIN subscriptions s ON u.id = s.user_id
JOIN plans p ON s.plan_id = p.id
WHERE s.status = 'active'
ORDER BY s.ends_at ASC;
```

### 3. Relatório de receita mensal
```sql
SELECT 
    DATE_TRUNC('month', pt.created_at) as month,
    COUNT(*) as total_transactions,
    SUM(pt.amount) as total_revenue,
    p.name as plan_name
FROM payment_transactions pt
JOIN subscriptions s ON pt.subscription_id = s.id
JOIN plans p ON s.plan_id = p.id
WHERE pt.status = 'completed'
GROUP BY DATE_TRUNC('month', pt.created_at), p.name
ORDER BY month DESC, plan_name;
```

## Considerações de Segurança

1. **Senhas**: Sempre armazenar hash das senhas usando bcrypt ou similar
2. **Tokens**: Armazenar hash dos tokens de sessão, não o token em si
3. **Dados Sensíveis**: Considerar criptografia para dados sensíveis como CRM
4. **Auditoria**: Logs de atividade para rastreabilidade
5. **Backup**: Estratégia de backup regular dos dados
6. **GDPR/LGPD**: Considerar políticas de retenção e exclusão de dados

## Migrações

As migrações devem ser executadas na seguinte ordem:
1. Criar tabela `plans`
2. Inserir dados iniciais em `plans`
3. Criar tabela `users`
4. Criar tabela `subscriptions`
5. Criar tabela `user_sessions`
6. Criar tabela `payment_transactions`
7. Criar tabela `user_activity_logs`
8. Criar tabela `feature_access_control`
9. Inserir dados iniciais em `feature_access_control`
10. Criar triggers e funções