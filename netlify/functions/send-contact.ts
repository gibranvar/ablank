export const handler = async (event: any) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { nombre, correo, puesto, mensaje, supportType, tipo } = JSON.parse(event.body || '{}');

    if (!nombre || !correo || !mensaje) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Faltan campos obligatorios (nombre, correo, mensaje)' })
      };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is missing');
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error: RESEND_API_KEY missing' })
      };
    }
    const isCorp = tipo === 'corporativo';

    const subject = isCorp
      ? `[Nuevo Lead Corporativo] ${nombre} - ${puesto || 'Sin puesto'}`
      : `[Ticket de Soporte] ${nombre} - ${supportType || 'Consulta General'}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0b0c10; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: ${isCorp ? '#3b82f6' : '#10b981'}; text-transform: uppercase;">
                ${isCorp ? '● PROSPECTO CORPORATIVO B2B' : '● TICKET DE SOPORTE DE INFRAESTRUCTURA'}
              </span>
              <h1 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">
                ${isCorp ? 'Nueva Solicitud de Soluciones Corporativas' : 'Nuevo Requerimiento de Soporte'}
              </h1>
            </td>
          </tr>

          <!-- Content Details -->
          <tr>
            <td style="padding: 32px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 16px; width: 140px; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-weight: 500;">Nombre:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 600;">${nombre}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-weight: 500;">Correo Electrónico:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #38bdf8; font-weight: 500;">
                    <a href="mailto:${correo}" style="color: #38bdf8; text-decoration: none;">${correo}</a>
                  </td>
                </tr>
                ${isCorp ? `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-weight: 500;">Puesto / Rol:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 500;">${puesto || 'No especificado'}</td>
                </tr>
                ` : `
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-weight: 500;">Tipo de Soporte:</td>
                  <td style="padding-bottom: 16px; font-size: 14px; color: #ffffff; font-weight: 500;">${supportType || 'General'}</td>
                </tr>
                `}
                <tr>
                  <td style="padding-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-weight: 500;">Fecha de Envío:</td>
                  <td style="padding-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.7); font-mono;">${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })} (CDMX)</td>
                </tr>
              </table>

              <!-- Mensaje / Requerimiento -->
              <div style="margin-top: 24px; padding: 20px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255, 255, 255, 0.5); display: block; margin-bottom: 10px;">
                  Detalle del Mensaje / Requerimiento:
                </span>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">
                  ${mensaje}
                </p>
              </div>

              <!-- Quick Action -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${correo}?subject=Re: Solicitud A BLANK - ${encodeURIComponent(nombre)}" style="display: inline-block; background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
                  Responder a ${nombre}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; border-top: 1px solid rgba(255, 255, 255, 0.06); background-color: rgba(0, 0, 0, 0.2); font-size: 12px; color: rgba(255, 255, 255, 0.4); text-align: center;">
              A BLANK Technologies · Sistema de Notificaciones Web · ablank.mx
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    if (!resendResponse.ok) {
      console.error('[Resend Error]', data);
      return {
        statusCode: resendResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: data.message || 'Error al enviar correo vía Resend' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (err: any) {
    console.error('[Server Error]', err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: err.message || 'Error interno del servidor' })
    };
  }
};
