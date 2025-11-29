import axios from 'axios'

let handler = async (m, { conn, args }) => {
    const trackingNumber = args[0]
    const courier = args[1] || ''

    if (!trackingNumber) throw 'Enter the shipment tracking number.\nExample: `.cekresi SPXID054330680586 shopee-express`'

    await conn.sendMessage(m.chat, {
        text: wait,
    });

    const courierList = {
        'shopee-express': 'SPX',
        'ninja': 'NINJA',
        'lion-parcel': 'LIONPARCEL',
        'pos-indonesia': 'POS',
        'tiki': 'TIKI',
        'acommerce': 'ACOMMERCE',
        'gtl-goto-logistics': 'GTL',
        'paxel': 'PAXEL',
        'sap-express': 'SAP',
        'indah-logistik-cargo': 'INDAH',
        'lazada-express-lex': 'LEX',
        'lazada-logistics': 'LEL',
        'janio-asia': 'JANIO',
        'jet-express': 'JETEXPRESS',
        'pcp-express': 'PCP',
        'pt-ncs': 'NCS',
        'nss-express': 'NSS',
        'grab-express': 'GRAB',
        'rcl-red-carpet-logistics': 'RCL',
        'qrim-express': 'QRIM',
        'ark-xpress': 'ARK',
        'standard-express-lwe': 'LWE',
        'luar-negeri-bea-cukai': 'BEACUKAI',
    };

    try {
        const url = `${APIs.ryzumi}/api/tool/cek-resi?resi=${trackingNumber}${courier ? `&ekspedisi=${courier}` : ''}`;
        const res = await axios.get(url);
        const result = res.data;

        if (!result.success || !result.data) {
            if (!courier) {
                const available = Object.keys(courierList).join(', ');
                throw `Failed to detect courier from tracking number.\nTry including the courier manually.\n\nExample: \`.cekresi SPXIDxxxxxx shopee-express\`\n\nCourier list:\n${available}`;
            } else {
                throw 'Tracking number not found or invalid.';
            }
        }

        const data = result.data;
        const historyText = data.history?.slice(0, 5).map((item) => `• ${item.tanggal}\n  ${item.keterangan}`).join('\n\n') || 'No history available.';

        const infoText = `
📦 *TRACKING RESULT*

Tracking Number : ${data.resi}
Courier         : ${data.ekspedisi}
Status          : ${data.status}
Shipment Date   : ${data.tanggalKirim}
Last Position   : ${data.lastPosition}
Courier CS      : ${data.customerService}

🕓 *Latest History:*
${historyText}
`.trim();

        await conn.sendMessage(m.chat, {
            text: infoText,
        });

    } catch (e) {
        const available = Object.keys(courierList).join(', ');
        await conn.sendMessage(m.chat, {
            text: `Failed to track the shipment.\n\nTry including the courier manually.\n\nExample: \`.cekresi SPXIDxxxxxx shopee-express\`\n\nCourier list:\n${available}`,
        });
    }
}

handler.help = ['cekresi [tracking_number] [courier]']
handler.tags = ['tool']
handler.command = /^(cekresi|resi)$/i

handler.register = true
handler.limit = true

export default handler