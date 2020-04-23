const pengguna = []

const tambahPengguna = ({ id, nama_pengguna, ruangan }) => {
    nama_pengguna = nama_pengguna.trim().toLowerCase();
    ruangan = ruangan.trim().toLowerCase();
    // validasi data
    if (!nama_pengguna || !ruangan) {
        return {
            error: 'Nama Pengguna dan ruangan harus diisi!'
        };
    }

    // cek pengguna
    const pengguna_aktif = pengguna.find((data) => {
        return data.ruangan === ruangan && data.nama_pengguna === nama_pengguna;
    })

    // Validate nama_pengguna
    if (pengguna_aktif) {
        return {
            error: 'nama pengguna telah digunakan!'
        };
    }

    // tambah pengguna
    const pengguna_baru = { id, nama_pengguna, ruangan };
    pengguna.push(pengguna_baru);
   
    return { pengguna_baru };
}

const hapusPengguna = (id) => {
    const index = pengguna.findIndex((data) => data.id === id)

    if (index !== -1) {
        return pengguna.splice(index, 1)[0]
    }
}

const ambilPengguna = (id) => {
    return pengguna.find((data) => data.id === id)
}

const ambilNamaPengguna = (nama) => {
  
    return pengguna.find((data) => data.nama_pengguna === nama)
}

const ambilPenggunaRuangan = (ruangan) => {
    ruangan = ruangan.trim().toLowerCase()
    return pengguna.filter((data) => data.ruangan === ruangan)
}

module.exports = {
    tambahPengguna,
    hapusPengguna,
    ambilPengguna,
    ambilPenggunaRuangan,
    ambilNamaPengguna
}