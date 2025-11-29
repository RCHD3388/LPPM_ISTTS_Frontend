// src/utils/fileApi.js
import axios from 'axios';
import LocalStorageService from './LocalStorageService';

const fileApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Tambahkan interceptor auth (sama seperti apiService)
fileApi.interceptors.request.use(config => {
  const token = LocalStorageService.getItem('app_user')?.token || "";
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

const onDownloadServerFile = async(sumberLampiran, sumber_tag = "") => {
  console.log(sumberLampiran)
  try {
    const response = await fileApi.get(`/download`, {
      params: { id: sumberLampiran },
      responseType: 'blob',
      // Penting: jangan biarkan Axios parse sebagai JSON/text
    });

    // ✅ Ambil MIME type dari header response (lebih akurat!)
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const contentDisposition = response.headers['content-disposition'];

    // Ekstrak filename dari header (opsional tapi bagus)
    let fileName = sumber_tag || `lampiran`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
      if (match) {
        fileName = decodeURIComponent(match[1]);
      } else {
        const match2 = contentDisposition.match(/filename="?(.+)"?/i);
        if (match2) fileName = match2[1];
      }
    }

    // ✅ Buat Blob dengan type yang benar
    const blob = new Blob([response.data], { type: contentType });

    // ✅ Buat URL dan download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // 👈 ini penting!
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Download error:", error);
    alert("Gagal mengunduh file.");
  }
};

export {fileApi, onDownloadServerFile};