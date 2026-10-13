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
    const { to_email, html_content, pdf_base64 } = JSON.parse(event.body || '{}');

    if (!to_email || !html_content || !pdf_base64) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Faltan campos obligatorios' })
      };
    }

    const parts = (pdf_base64 || '').split(',');
    const cleanBase64 = parts.length > 1 ? parts[1] : parts[0];

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is missing');
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error: RESEND_API_KEY missing' })
      };
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    const resData = await resendResponse.json();

    if (!resendResponse.ok) {
      return {
        statusCode: resendResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: resData.message || 'Error en Resend', details: resData })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, id: resData.id, message: 'Email enviado exitosamente vía Resend' })
    };
  } catch (err: any) {
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
