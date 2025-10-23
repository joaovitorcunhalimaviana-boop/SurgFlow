-- Create admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (
  full_name,
  email,
  whatsapp,
  birth_date,
  password_hash,
  plan,
  role,
  is_active,
  email_verified
) VALUES (
  'Administrador Master',
  'admin@surgflow.com',
  '+5511999999999',
  '1990-01-01',
  '$2b$10$rOvHPH8.OVFOxf/5.Oe9/.C7VKVlAuuu9yHI2Hi6A/FXzfWm8Uy8.',
  'admin',
  'super_admin',
  true,
  true
);

-- Create admin subscription
INSERT INTO subscriptions (
  user_id,
  plan_id,
  status,
  started_at,
  expires_at
) VALUES (
  (SELECT id FROM users WHERE email = 'admin@surgflow.com'),
  (SELECT id FROM plans WHERE slug = 'admin'),
  'active',
  NOW(),
  NULL -- Never expires
);