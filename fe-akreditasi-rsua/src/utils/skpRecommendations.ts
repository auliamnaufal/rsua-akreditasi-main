// Rekomendasi tindak lanjut per SKP, dikelompokkan berdasarkan grading risiko.
// Sumber: Rekomendasi Grading.docx
type GradeGroup = "biruHijau" | "kuning" | "merah";

const RECOMMENDATIONS: Record<string, Record<GradeGroup, string[]>> = {
  skp1: {
    biruHijau: [
      "Lakukan briefing ulang penggunaan minimal 2 identitas pasien.",
      "Pastikan verifikasi identitas dilakukan sebelum pengambilan spesimen.",
      "Lakukan pengecekan gelang identitas setiap shift.",
    ],
    kuning: [
      "Mengevaluasi desain alur identifikasi, gelang pasien, sistem informasi, komunikasi, beban kerja, dan supervisi.",
      "Melakukan redesign proses identifikasi dengan 2 identitas + barcode/scan bila tersedia.",
      "Audit kepatuhan ≥95%, dan evaluasi efektivitas selama 3 bulan.",
    ],
    merah: [
      "Mengevaluasi desain alur identifikasi, gelang pasien, sistem informasi, komunikasi, beban kerja, dan supervisi.",
      "Melakukan redesign proses identifikasi dengan 2 identitas + barcode/scan bila tersedia.",
      "Audit kepatuhan ≥95%, dan evaluasi efektivitas selama 3 bulan.",
    ],
  },
  skp2: {
    biruHijau: [
      "Refreshing metode tulis–baca kembali–konfirmasi (read-back).",
      "Penguatan penggunaan SBAR.",
      "Supervisi dokumentasi komunikasi melalui telepon.",
    ],
    kuning: [
      "Memperkuat SBAR + read-back/confirmation.",
      "Menetapkan format baku instruksi telepon.",
      "Memasukkan read-back sebagai bagian wajib dokumentasi.",
      "Melakukan audit kepatuhan ≥95% selama 3 bulan.",
    ],
    merah: [
      "Memperkuat SBAR + read-back/confirmation.",
      "Menetapkan format baku instruksi telepon.",
      "Memasukkan read-back sebagai bagian wajib dokumentasi.",
      "Melakukan audit kepatuhan ≥95% selama 3 bulan.",
    ],
  },
  skp3: {
    biruHijau: [
      "Pisahkan penyimpanan obat LASA.",
      "Berikan label LASA sesuai kebijakan RS.",
      "Tingkatkan penerapan double-check obat.",
    ],
    kuning: [
      "Mengevaluasi sistem penyimpanan, label, resep, sistem elektronik, double-check, dan komunikasi.",
      "Menerapkan independent double-check pada obat yang ditetapkan high-alert.",
      "Memperbaiki sistem LASA.",
      "Melakukan audit medication error dan kepatuhan selama 3 bulan.",
    ],
    merah: [
      "Mengevaluasi sistem penyimpanan, label, resep, sistem elektronik, double-check, dan komunikasi.",
      "Menerapkan independent double-check pada obat yang ditetapkan high-alert.",
      "Memperbaiki sistem LASA.",
      "Melakukan audit medication error dan kepatuhan selama 3 bulan.",
    ],
  },
  skp4: {
    biruHijau: [
      "Lengkapi verifikasi pre-procedure verification.",
      "Pastikan site marking dilakukan sesuai kebijakan.",
      "Gunakan checklist sebelum tindakan.",
      "Evaluasi kepatuhan time-out.",
    ],
    kuning: [
      "Audit pre-procedure verification, informed consent, site marking, checklist dan time-out.",
      "Melakukan standardisasi verifikasi lintas profesi.",
      "Menetapkan bahwa tindakan tidak boleh dimulai sebelum seluruh elemen verifikasi lengkap.",
      "Audit kepatuhan checklist/time-out ≥95%.",
    ],
    merah: [
      "Audit pre-procedure verification, informed consent, site marking, checklist dan time-out.",
      "Melakukan standardisasi verifikasi lintas profesi.",
      "Menetapkan bahwa tindakan tidak boleh dimulai sebelum seluruh elemen verifikasi lengkap.",
      "Audit kepatuhan checklist/time-out ≥95%.",
    ],
  },
  skp5: {
    biruHijau: [
      "Berikan feedback langsung.",
      "Reinforcement 5 Moments for Hand Hygiene.",
      "Pastikan handrub tersedia di titik pelayanan.",
      "Audit kepatuhan hand hygiene dan kepatuhan APD.",
    ],
    kuning: [
      "Mengevaluasi hand hygiene, teknik aseptik, ketersediaan alat, kompetensi, supervisi dan lingkungan.",
      "Melakukan redesign proses bila diperlukan.",
      "Competency assessment petugas.",
      "Audit kepatuhan teknik aseptik dan hand hygiene secara berkala.",
    ],
    merah: [
      "Mengevaluasi hand hygiene, teknik aseptik, ketersediaan alat, kompetensi, supervisi dan lingkungan.",
      "Melakukan redesign proses bila diperlukan.",
      "Competency assessment petugas.",
      "Audit kepatuhan teknik aseptik dan hand hygiene secara berkala.",
    ],
  },
  skp6: {
    biruHijau: [
      "Edukasi pasien/keluarga.",
      "Pastikan intervensi pencegahan jatuh terdokumentasi.",
      "Ingatkan staf melakukan pengecekan risiko jatuh.",
      "Pastikan bel pasien mudah dijangkau.",
      "Evaluasi penempatan pasien berisiko tinggi jatuh.",
    ],
    kuning: [
      "Audit kepatuhan asesmen risiko jatuh, asesmen ulang, handover, intervensi pencegahan, lingkungan, pemantauan dan komunikasi dengan keluarga.",
      "Menetapkan bundle pencegahan jatuh sesuai tingkat risiko.",
      "Memperbaiki handover.",
      "Melakukan audit kepatuhan dan monitoring kejadian jatuh selama 3 bulan.",
    ],
    merah: [
      "Audit kepatuhan asesmen risiko jatuh, asesmen ulang, handover, intervensi pencegahan, lingkungan, pemantauan dan komunikasi dengan keluarga.",
      "Menetapkan bundle pencegahan jatuh sesuai tingkat risiko.",
      "Memperbaiki handover.",
      "Melakukan audit kepatuhan dan monitoring kejadian jatuh selama 3 bulan.",
    ],
  },
};

const GRADE_LABEL: Record<string, string> = {
  BIRU: "Grade Biru dan Hijau",
  HIJAU: "Grade Biru dan Hijau",
  KUNING: "Grade Kuning (RCA/Root Cause Analysis Sederhana)",
  MERAH: "Grade Merah (RCA Komprehensif)",
};

function gradeGroup(grading?: string | null): GradeGroup | null {
  switch (grading?.toUpperCase()) {
    case "BIRU":
    case "HIJAU":
      return "biruHijau";
    case "KUNING":
      return "kuning";
    case "MERAH":
      return "merah";
    default:
      return null;
  }
}

export function getSkpRecommendation(
  skpCode?: string | null,
  grading?: string | null
): { label: string; items: string[] } | null {
  const skpKey = skpCode?.toLowerCase();
  const group = gradeGroup(grading);
  if (!skpKey || !group || !RECOMMENDATIONS[skpKey]) return null;
  return {
    label: GRADE_LABEL[grading!.toUpperCase()],
    items: RECOMMENDATIONS[skpKey][group],
  };
}
