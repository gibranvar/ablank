import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

function resendDevPlugin(apiKey?: string): Plugin {
  return {
    name: 'resend-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const key = apiKey || process.env.RESEND_API_KEY;

        if (req.url === '/api/send-brief' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              if (!key) {
                throw new Error('RESEND_API_KEY no configurado en entorno');
              }
              const { to_email, html_content, pdf_base64 } = JSON.parse(body || '{}');

              const parts = (pdf_base64 || '').split(',');
              const cleanBase64 = parts.length > 1 ? parts[1] : parts[0];

              const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${key}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  from: 'A BLANK <hello@ablank.mx>',
                  to: [to_email],
                  bcc: ['hello@ablank.mx'],
                  subject: 'A BLANK - Executive Brief: Diagnóstico Operativo Lead-to-Cash',
                  html: html_content,
                  attachments: [
                    {
                      filename: 'executive-brief.pdf',
                      content: cleanBase64
                    }
                  ]
                })
              });

              const data = await resendResponse.json();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = resendResponse.status;
              res.end(JSON.stringify(data));
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/send-contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              if (!key) {
                throw new Error('RESEND_API_KEY no configurado en entorno');
              }
              const { nombre, correo, puesto, mensaje, supportType, tipo } = JSON.parse(body || '{}');
              const isCorp = tipo === 'corporativo';
              const subject = isCorp
                ? `[VENTAS B2B] Solicitud Directa: ${nombre} (${puesto || 'Sin puesto'})`
                : `[TICKET SOPORTE] Solicitud de Ayuda: ${nombre} - ${supportType || 'General'}`;

              const htmlContent = `
                <div style="background-color: #0b0c10; color: #fff; padding: 30px; font-family: sans-serif; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                  <h2 style="margin-top: 0; color: ${isCorp ? '#38bdf8' : '#34d399'}; font-size: 18px;">
                    ${isCorp ? '● LEAD DE VENTAS - FORMULARIO CORPORATIVO' : '● TICKET DE SOPORTE - PORTAL CLIENTES'}
                  </h2>
                  <p><strong>Nombre:</strong> ${nombre}</p>
                  <p><strong>Correo:</strong> <a href="mailto:${correo}" style="color: #38bdf8;">${correo}</a></p>
                  ${isCorp ? `<p><strong>Puesto:</strong> ${puesto || 'No especificado'}</p>` : `<p><strong>Tipo de Soporte:</strong> ${supportType || 'General'}</p>`}
                  <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <strong>Mensaje:</strong>
                    <p style="white-space: pre-wrap; margin-bottom: 0;">${mensaje}</p>
                  </div>
                </div>
              `;

              const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${key}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  from: 'A BLANK <hello@ablank.mx>',
                  to: ['hello@ablank.mx'],
                  reply_to: correo,
                  subject: subject,
                  html: htmlContent
                })
              });

              const data = await resendResponse.json();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = resendResponse.status;
              res.end(JSON.stringify(data));
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), resendDevPlugin(env.RESEND_API_KEY)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
