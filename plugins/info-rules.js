let handler = async (m, { conn, usedPrefix }) => {
    m.reply(`
╔══════════════
╟「 *${global.namebot}* 」
┣═══════════════
╟   *Hai ${await conn.getName(m.sender)}*
╟   Terimakasih telah menggunakan *${global.namebot}*
╟   
╟   ketik  *.menu* untuk melihat daftar menu di bot
┣═══════════════
╟   Jadikan bot sebagai admin
╟   agar lebih maksimal 
┣═══════════════
╟   *Catatan untuk semua member group*
╟   • Bot ini on always 24 Jam
╟   • Jangan spam bot di group
╟   • Penyalahgunaan bot
╟     pada group ditanggung
╟     member/pengguna
╟   
╟   Disarankan untuk :
╟   • Membisukan notifikasi group
╟   • Mematikan download otomatis,
╟     karena bot ini berpotensi
╟     mengirim banyak media
╟   
╟   Jika ada yang ditanyakan hubungi 
╟   {https://wa.me/6287823745178}
╟   
╟   Sekian, Terimakasih.. Have fun ^_^
╚════════════════
`.trim()) // Tambah sendiri kalo mau
}
handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules?)$/i
handler.owner = false
export default handler