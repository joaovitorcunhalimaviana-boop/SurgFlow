## **📋 O QUE ESTÁ IMPLEMENTADO (CONFIRMADO):**

### **✅ Estrutura Atual:**

* **3 cards de planos lado a lado**  
* **Toggle Mensal/Anual (COM desconto anual) ✅**  
* **Seção de FAQ ✅**  
* **Preços visíveis**  
* **Botões de CTA**  
* **Layout responsivo**  
* **Identidade visual roxo/branco**

---

## **🎯 ALTERAÇÕES NECESSÁRIAS (BASEADO NO QUE VOCÊ PEDIU):**

---

### **ALTERAÇÃO 1: NOMES DOS PLANOS**

ATUAL:

* "Gratuito"  
* "Intermediário"  
* "Avançado"

MUDAR PARA:

* "StartFlow"  
* "GuideFlow"  
* "MindFlow"

---

### **ALTERAÇÃO 2: PREÇOS**

MANTER:

* StartFlow: R$ 0  
* GuideFlow: R$ 49,90/mês ou R$ 499/ano  
* MindFlow: R$ 297/mês ou R$ 2.970/ano

SEM:

* ❌ Promoções de lançamento  
* ❌ Descontos para primeiros X  
* ❌ Preços promocionais

(Você fará descontos via cupons depois)  
---

### **ALTERAÇÃO 3: FEATURES DO STARTFLOW**

MUDAR PARA:  
✅ 1 GuideFlow Completo • Apendicite Aguda (WSES 2020\) ✅ 3 Calculadoras • Escore de Alvarado • Escore AIR • Escore AAS ✅ Acesso Ilimitado • Sem restrição de consultas ❌ Casos clínicos ❌ Newsletter ❌ Exportar PDF ❌ Modo offline  
---

### **ALTERAÇÃO 4: FEATURES DO GUIDEFLOW**

MUDAR PARA:  
✅ TODOS os GuideFlows • Acesso ilimitado a todos os guidelines ✅ TODAS as Calculadoras • Todas as ferramentas disponíveis ✅ 24 Casos Clínicos por Ano • 2 casos novos por mês (quinzenais) • Publicados na plataforma • Sistema de comentários • Discussão com especialistas ✅ Newsletter Mensal • Atualizações de guidelines • Estudos recentes • Dicas práticas ✅ Funcionalidades Avançadas • Exportar resultados em PDF • Modo Offline (funciona sem internet) • Salvamento de progresso • Histórico de avaliações ✅ Suporte por Email • Resposta em até 72h ❌ Grupo WhatsApp ❌ Aulas ao vivo ❌ Orientação científica  
---

### **ALTERAÇÃO 5: FEATURES DO MINDFLOW**

MUDAR PARA:  
✨ Tudo do GuideFlow \+ ✅ GRUPO WHATSAPP EXCLUSIVO • Discussão de casos reais do dia a dia • Compartilhamento de casos interessantes • Artigos recentes e discussões • Dúvidas de plantão • Networking com cirurgiões especialistas • Você \+ especialistas (coloproctologia, digestivo, endoscopia) ✅ AULA MENSAL AO VIVO (1h) • Última quinta do mês • Caso complexo \+ Artigo \+ Q\&A • Gravação disponível • Temas rotativos ✅ ORIENTAÇÃO DE PROJETOS CIENTÍFICOS • Revisão de protocolos • Sugestão de temas • Revisão de artigos • Acompanhamento personalizado • Possibilidade de co-autoria ✅ COMPETIÇÕES CIENTÍFICAS MENSAIS • Submeta projetos na plataforma • Votação da comunidade • Prêmios e reconhecimento ✅ NETWORKING PROFISSIONAL • Conexões com cirurgiões • Oportunidades de colaboração ✅ ACESSO ANTECIPADO • Novos guidelines antes do lançamento • Influenciar roadmap  
---

### **ALTERAÇÃO 6: DESCRIÇÕES DOS PLANOS**

Adicionar descrição curta em cada card:  
StartFlow:  
"Experimente o SurgFlow gratuitamente. Acesse o GuideFlow de Apendicite e calculadoras essenciais."  
GuideFlow:  
"Todos os guidelines e calculadoras na palma da sua mão. Decisões baseadas em evidências em segundos."  
MindFlow:  
"Mais que guidelines: uma comunidade ativa de cirurgiões. Discussões reais, orientação científica e networking que impulsiona sua carreira."  
---

### **ALTERAÇÃO 7: REMOVER MENÇÕES A:**

REMOVER:

* ❌ Estágios (em qualquer plano)  
* ❌ Garantia de 7 dias  
* ❌ Garantia de devolução  
* ❌ "Teste grátis"  
* ❌ Promoções de lançamento  
* ❌ Limites de membros

---

### **ALTERAÇÃO 8: ADICIONAR POLÍTICAS CLARAS**

Adicionar seção:  
POLÍTICAS DE PAGAMENTO 📅 Plano Mensal: • Renovação automática todo mês • Cancele quando quiser • Acesso mantido até o fim do período pago • Sem devolução proporcional 📅 Plano Anual: • Pagamento único anual • Válido por 12 meses completos • Sem devolução em caso de cancelamento • Economize 17% vs mensal 💳 Formas de Pagamento: • Cartão de crédito • Pix (plano anual) 🔒 Segurança: • Pagamento processado por \[Stripe/Mercado Pago\] • Dados criptografados • Ambiente seguro  
---

### **ALTERAÇÃO 9: DESTACAR MINDFLOW VISUALMENTE**

Aplicar CSS:  
**css**  
**Copiar**  
***/\* MindFlow \- Card Destacado \*/***  
**.plan-card.mindflow {**  
  **transform: scale(1.05);**  
  **border: 3px solid \#a855f7;**  
  **background: linear-gradient(135deg, \#faf5ff 0%, \#ffffff 100%);**  
  **box-shadow: 0 12px 32px rgba(126, 34, 206, 0.2);**  
  **position: relative;**  
  **z-index: 10;**  
**}**

***/\* Badge "RECOMENDADO" \*/***  
**.plan-card.mindflow::before {**  
  **content: 'RECOMENDADO';**  
  **position: absolute;**  
  **top: \-14px;**  
  **left: 50%;**  
  **transform: translateX(\-50%);**  
  **background: linear-gradient(135deg, \#7e22ce 0%, \#a855f7 100%);**  
  **color: white;**  
  **padding: 6px 20px;**  
  **border-radius: 16px;**  
  **font-size: 0.75rem;**  
  **font-weight: 700;**  
  **text-transform: uppercase;**  
  **box-shadow: 0 6px 16px rgba(126, 34, 206, 0.4);**  
  **letter-spacing: 0.05em;**  
**}**

***/\* Botão MindFlow mais chamativo \*/***  
**.plan-card.mindflow .cta-button {**  
  **background: linear-gradient(135deg, \#7e22ce 0%, \#a855f7 100%);**  
  **font-size: 1.125rem;**  
  **padding: 16px 32px;**  
  **box-shadow: 0 6px 20px rgba(126, 34, 206, 0.4);**  
**}**

**.plan-card.mindflow .cta-button:hover {**  
  **transform: translateY(\-2px);**  
  **box-shadow: 0 8px 28px rgba(126, 34, 206, 0.5);**  
**}**  
---

### **ALTERAÇÃO 10: MELHORAR FAQ**

Adicionar perguntas específicas sobre planos:  
FAQ \- ADICIONAR: ❓ Posso cancelar quando quiser? ✅ Sim\! No plano mensal, cancele a qualquer momento e mantenha acesso até o fim do mês pago. No plano anual, o acesso é válido pelos 12 meses completos, sem devolução proporcional. ❓ Qual a diferença entre GuideFlow e MindFlow? ✅ GuideFlow é conteúdo (guidelines \+ casos clínicos \+ funcionalidades). MindFlow é comunidade (grupo WhatsApp ativo \+ aulas ao vivo \+ orientação científica \+ networking). ❓ O grupo WhatsApp do MindFlow tem limite de membros? ✅ Não\! Quanto mais membros, mais rica a discussão e o networking. ❓ Posso fazer upgrade do meu plano? ✅ Sim\! Faça upgrade a qualquer momento. O valor é ajustado proporcionalmente. ❓ Como funciona o pagamento anual? ✅ Pagamento único com 17% de desconto. Acesso válido por 12 meses. Sem devolução em caso de cancelamento antecipado. ❓ Os casos clínicos são os mesmos no GuideFlow e MindFlow? ✅ Sim\! Os 24 casos publicados na plataforma são os mesmos. O diferencial do MindFlow é o grupo WhatsApp com casos do dia a dia compartilhados em tempo real pelos membros e especialistas. ❓ Posso usar cupom de desconto? ✅ Sim\! Cupons promocionais podem ser aplicados no checkout.  
---

## **🚀 PROMPT FINAL PARA TRAE:**

---

**markdown**  
**Copiar**  
**\# OBJETIVO**

**Atualizar a página de planos (/planos) do SurgFlow com as correções**   
**e melhorias especificadas abaixo.**

**\---**

**\#\# ALTERAÇÕES OBRIGATÓRIAS**

**\#\#\# 1\. NOMES DOS PLANOS**

**ALTERAR em todos os lugares:**  
**\- "Gratuito" → "StartFlow"**  
**\- "Intermediário" → "GuideFlow"**  
**\- "Avançado" → "MindFlow"**

**\---**

**\#\#\# 2\. PREÇOS (MANTER COMO ESTÁ)**

**✅ StartFlow: R$ 0**  
**✅ GuideFlow: R$ 49,90/mês ou R$ 499/ano**  
**✅ MindFlow: R$ 297/mês ou R$ 2.970/ano**

**NÃO adicionar:**  
**\- ❌ Promoções de lançamento**  
**\- ❌ Descontos para primeiros X**  
**\- ❌ Preços promocionais**

**\---**

**\#\#\# 3\. FEATURES \- STARTFLOW**

**SUBSTITUIR features atuais por:**

**✅ 1 GuideFlow Completo • Apendicite Aguda (WSES 2020\)**  
**✅ 3 Calculadoras • Escore de Alvarado • Escore AIR • Escore AAS**  
**✅ Acesso Ilimitado • Sem restrição de consultas**  
**❌ Casos clínicos ❌ Newsletter ❌ Exportar PDF ❌ Modo offline ❌ Grupo WhatsApp ❌ Aulas ao vivo**  
**\--- \#\#\# 4\. FEATURES \- GUIDEFLOW SUBSTITUIR features atuais por:**  
**✅ TODOS os GuideFlows • Acesso ilimitado a todos os guidelines**  
**✅ TODAS as Calculadoras • Todas as ferramentas disponíveis**  
**✅ 24 Casos Clínicos por Ano • 2 casos novos por mês (quinzenais) • Sistema de comentários • Discussão com especialistas**  
**✅ Newsletter Mensal • Atualizações de guidelines • Estudos recentes • Dicas práticas**  
**✅ Funcionalidades Avançadas • Exportar resultados em PDF • Modo Offline (PWA) • Salvamento de progresso**  
**✅ Suporte por Email (72h)**  
**❌ Grupo WhatsApp ❌ Aulas ao vivo ❌ Orientação científica**  
**\--- \#\#\# 5\. FEATURES \- MINDFLOW SUBSTITUIR features atuais por:**  
**✨ Tudo do GuideFlow \+**  
**✅ GRUPO WHATSAPP EXCLUSIVO • Discussão de casos reais do dia a dia • Artigos recentes e discussões • Networking com especialistas • Dúvidas de plantão**  
**✅ AULA MENSAL AO VIVO (1h) • Casos complexos \+ Q\&A • Gravação disponível**  
**✅ ORIENTAÇÃO DE PROJETOS CIENTÍFICOS • Revisão de protocolos e artigos • Possibilidade de co-autoria**  
**✅ COMPETIÇÕES CIENTÍFICAS MENSAIS • Submeta projetos • Prêmios e reconhecimento**  
**✅ NETWORKING PROFISSIONAL • Conexões com cirurgiões**  
**✅ ACESSO ANTECIPADO • Novos guidelines primeiro**  
**\--- \#\#\# 6\. DESCRIÇÕES DOS PLANOS ADICIONAR descrição curta abaixo do nome de cada plano: \*\*StartFlow:\*\***  
**"Experimente gratuitamente o GuideFlow de Apendicite"**  
**\*\*GuideFlow:\*\***  
**"Todos os guidelines e funcionalidades completas"**  
**\*\*MindFlow:\*\***  
**"Comunidade ativa \+ Orientação científica \+ Networking"**  
**\--- \#\#\# 7\. DESTACAR MINDFLOW VISUALMENTE APLICAR CSS para destacar o card do MindFlow: \`\`\`css .plan-card.mindflow { transform: scale(1.05); border: 3px solid \#a855f7; background: linear-gradient(135deg, \#faf5ff 0%, \#ffffff 100%); box-shadow: 0 12px 32px rgba(126, 34, 206, 0.2); position: relative; } .plan-card.mindflow::before { content: 'RECOMENDADO'; position: absolute; top: \-14px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, \#7e22ce 0%, \#a855f7 100%); color: white; padding: 6px 20px; border-radius: 16px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; box-shadow: 0 6px 16px rgba(126, 34, 206, 0.4); }**  
---

### **8\. REMOVER COMPLETAMENTE**

**REMOVER qualquer menção a:**

* **❌ Estágios**  
* **❌ Garantia de 7 dias**  
* **❌ Garantia de devolução**  
* **❌ Teste grátis**  
* **❌ Promoções de lançamento**  
* **❌ "Primeiros X membros"**  
* **❌ Limites de membros**

---

### **9\. ADICIONAR POLÍTICAS DE PAGAMENTO**

**ADICIONAR seção após os cards:**  
**tsx**  
**Copiar**  
**\<div className\="payment-policies bg-gray-50 rounded-xl p-8 mt-12"\>**  
  **\<h3 className\="text-xl font-bold text-gray-900 mb-6 text-center"\>**  
    **Políticas de Pagamento**  
  **\</h3\>**  
    
  **\<div className\="grid grid-cols-1 md:grid-cols-2 gap-6"\>**  
    **\<div className\="policy-card bg-white rounded-lg p-6 border border-gray-200"\>**  
      **\<h4 className\="font-semibold text-purple-700 mb-3 flex items-center"\>**  
        **\<Calendar className\="h-5 w-5 mr-2" /\>**  
        **Plano Mensal**  
      **\</h4\>**  
      **\<ul className\="space-y-2 text-sm text-gray-700"\>**  
        **\<li\>• Renovação automática todo mês\</li\>**  
        **\<li\>• Cancele quando quiser\</li\>**  
        **\<li\>• Acesso mantido até o fim do mês pago\</li\>**  
        **\<li\>• Sem devolução proporcional\</li\>**  
      **\</ul\>**  
    **\</div\>**  
      
    **\<div className\="policy-card bg-white rounded-lg p-6 border border-gray-200"\>**  
      **\<h4 className\="font-semibold text-purple-700 mb-3 flex items-center"\>**  
        **\<Calendar className\="h-5 w-5 mr-2" /\>**  
        **Plano Anual**  
      **\</h4\>**  
      **\<ul className\="space-y-2 text-sm text-gray-700"\>**  
        **\<li\>• Pagamento único anual\</li\>**  
        **\<li\>• Válido por 12 meses completos\</li\>**  
        **\<li\>• Economize 17% vs mensal\</li\>**  
        **\<li\>• Sem devolução em caso de cancelamento\</li\>**  
      **\</ul\>**  
    **\</div\>**  
  **\</div\>**  
    
  **\<div className\="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4"\>**  
    **\<p className\="text-sm text-purple-800 text-center"\>**  
      **\<strong\>💳 Formas de pagamento:\</strong\> Cartão de crédito (mensal ou anual)**   
      **e Pix (apenas anual)**  
    **\</p\>**  
  **\</div\>**  
**\</div\>**  
---

### **10\. ATUALIZAR FAQ**

**ADICIONAR/ATUALIZAR perguntas no FAQ existente:**  
**ADICIONAR AO FAQ: ❓ Posso cancelar quando quiser? Sim\! No plano mensal, cancele a qualquer momento e mantenha acesso até o fim do mês pago. No plano anual, o acesso é válido pelos 12 meses completos, sem devolução proporcional. ❓ Qual a diferença entre GuideFlow e MindFlow? GuideFlow oferece todos os guidelines, calculadoras, casos clínicos e funcionalidades técnicas. MindFlow adiciona comunidade ativa (grupo WhatsApp), aulas ao vivo, orientação científica e networking profissional. ❓ O grupo WhatsApp do MindFlow tem limite de membros? Não\! Quanto mais membros, mais rica a discussão e o networking. ❓ Os casos clínicos são os mesmos no GuideFlow e MindFlow? Sim\! Os 24 casos publicados na plataforma são os mesmos. O diferencial do MindFlow é o grupo WhatsApp onde membros e especialistas compartilham casos do dia a dia em tempo real. ❓ Como funciona o pagamento anual? Pagamento único com 17% de desconto em relação ao mensal. Acesso válido por 12 meses completos. Não há devolução em caso de cancelamento antecipado. ❓ Posso usar cupom de desconto? Sim\! Cupons promocionais podem ser aplicados no momento do checkout. ❓ Posso fazer upgrade do meu plano? Sim\! Faça upgrade a qualquer momento. O valor é ajustado proporcionalmente. ❓ Há garantia de devolução? Não oferecemos garantia de devolução para proteger o conteúdo digital. Recomendamos começar com o StartFlow gratuito para experimentar antes de assinar.**  
---

### **11\. MELHORAR ÍCONES E VISUAL**

**ADICIONAR ícones nas features:**  
**tsx**  
**Copiar**  
**import {**   
  **CheckCircle,**   
  **X,**   
  **FileText,**   
  **Calculator,**   
  **BookOpen,**  
  **Mail,**  
  **Download,**  
  **Wifi,**  
  **MessageCircle,**  
  **Video,**  
  **Users,**  
  **Trophy,**  
  **Zap**  
**} from 'lucide-react'**

***// Usar ícones apropriados:***  
**\<CheckCircle /\> para features incluídas**  
**\<X /\> para features não incluídas**  
**\<FileText /\> para GuideFlows**  
**\<Calculator /\> para Calculadoras**  
**\<BookOpen /\> para Casos Clínicos**  
**\<Mail /\> para Newsletter**  
**\<Download /\> para PDF**  
**\<Wifi /\> para Offline**  
**\<MessageCircle /\> para Grupo WhatsApp**  
**\<Video /\> para Aulas**  
**\<Users /\> para Networking**  
**\<Trophy /\> para Competições**  
**\<Zap /\> para Acesso Antecipado**  
---

### **12\. RESPONSIVIDADE**

**GARANTIR que em mobile:**

* **Cards empilham verticalmente**  
* **MindFlow mantém destaque (não scale 1.05 em mobile)**  
* **Toggle mensal/anual funciona bem**  
* **FAQ é legível**  
* **Políticas são claras**

**css**  
**Copiar**  
**@media (max-width: 768px) {**  
  **.plan-card.mindflow {**  
    **transform: scale(1);**  
    **margin-top: 20px;**  
  **}**  
    
  **.plan-card.mindflow::before {**  
    **top: \-10px;**  
  **}**  
**}**  
---

## **IMPORTANTE \- NÃO ALTERAR**

* **✅ Manter toggle mensal/anual (já existe)**  
* **✅ Manter FAQ (já existe)**  
* **✅ Manter layout geral**  
* **✅ Manter identidade visual**  
* **✅ Manter estrutura de 3 cards**

---

## **RESULTADO ESPERADO**

**Página de planos com:**

* **✅ Nomes corretos (StartFlow/GuideFlow/MindFlow)**  
* **✅ Features detalhadas e corretas**  
* **✅ MindFlow visualmente destacado**  
* **✅ Descrições claras de cada plano**  
* **✅ Políticas de pagamento transparentes**  
* **✅ FAQ atualizado**  
* **✅ SEM estágios**  
* **✅ SEM garantias de devolução**  
* **✅ SEM promoções (você fará com cupons)**  
* **✅ Visual profissional e conversivo**

