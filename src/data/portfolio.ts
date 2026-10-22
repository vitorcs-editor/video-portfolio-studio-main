// Dados do portfólio — para adicionar um vídeo, basta incluir uma linha em `videos`.
// Os arquivos do Google Drive precisam estar compartilhados como "Qualquer pessoa com o link".

export type VideoCategory = "igaming" | "vsl" | "motion" | "ads" | "social";

export const CATEGORIES: VideoCategory[] = ["ads", "social", "motion", "vsl"];

export interface Client {
  id: string;
  name: string;
  logo: string;
  niche: VideoCategory;
}

export interface Video {
  clientId: string;
  /** ID do arquivo no Google Drive (trecho entre /d/ e /view no link). */
  driveId: string;
  /** Thumbnail local opcional; sem ela, usa a thumbnail gerada pelo Drive. */
  thumbnail?: string;
  /** Vídeos são verticais (9:16) por padrão. */
  horizontal?: boolean;
}

export const clients: Client[] = [
  { id: "1pra1_ads", name: "1pra1.bet", niche: "ads", logo: "/icons/1pra1.png" },
  { id: "1pra1_social", name: "1pra1.bet", niche: "social", logo: "/icons/1pra1.png" },
  { id: "1pra1_motion", name: "1pra1.bet", niche: "motion", logo: "/icons/1pra1.png" },
  { id: "projeto_draft", name: "Projeto Draft", niche: "social", logo: "/icons/projeto-draft.webp" },
  { id: "cruzeiro_basquete", name: "Cruzeiro Basquete", niche: "social", logo: "/icons/cruzeiro-basquete.webp" },
  { id: "fenix_vsl", name: "Group Phoenix", niche: "vsl", logo: "/icons/groupphoenix.png" },
];

export const videos: Video[] = [
  // 1pra1 — Ads
  { clientId: "1pra1_ads", driveId: "1pHYw6MhIjLjMQ7r1eh_IUTCIREgz0n5c" },
  { clientId: "1pra1_ads", driveId: "1ELf7fu0qj4_xHcOJo72rK3rANx8h5wtY" },
  { clientId: "1pra1_ads", driveId: "1um8aCN3pu5Svw3RB_LGmH-APNSYpOnfu" },
  { clientId: "1pra1_ads", driveId: "1QpYqAHDvUakiSsuKpteGQNdCubBiMud9" },
  { clientId: "1pra1_ads", driveId: "11cOzeVxT6bjRIS45iumhwi4rTRjxp_lu" },
  { clientId: "1pra1_ads", driveId: "1_0WR_S4n_HTl7pzm8ySddEGlZFzu7BDP" },
  { clientId: "1pra1_ads", driveId: "1tjmk_00xzc3Ir7zv9w0MXqMn09kg9DhG" },
  { clientId: "1pra1_ads", driveId: "16y5EnNgXkPSc0I5aYkd7U01MrgUSxu1K" },
  { clientId: "1pra1_ads", driveId: "1nRC8tvAscpix6ViLyTPU5AIGKyPxCDam" },
  { clientId: "1pra1_ads", driveId: "1XrEg1Va6E3r2jjdFVri4Edp52rCta1iu" },
  { clientId: "1pra1_ads", driveId: "1_zErpS3SpVpt4K-pkYtilPeVdbL5k-8h" },
  { clientId: "1pra1_ads", driveId: "1EHqR9VxJ-khoo8EBaFueNX0dWppkWd6l" },
  { clientId: "1pra1_ads", driveId: "1fY7cZM1YcVjO-9erLSJqXLe6fGperiyj" },
  { clientId: "1pra1_ads", driveId: "1oEQqdNqaz1n5hh-m5YFIpyxJyLgjvWn5" },
  { clientId: "1pra1_ads", driveId: "1cv5ml66wEMEC_qeguuh6dw6bEXHC-wok" },
  // 1pra1 — Reels (Social)
  { clientId: "1pra1_social", driveId: "1bQs6GjbMQ3-oJxSfkjT-8_fOSO6ibEq1" },
  { clientId: "1pra1_social", driveId: "1O8VTqaB76dF34zqlTkjnQxtgRV8Hj5Eh" },
  { clientId: "1pra1_social", driveId: "1D-ifCcfbFp-XZxYQBU8hs_xYKUXSeG3u" },
  { clientId: "1pra1_social", driveId: "1b9pn36kdwwIdCT5g8qdHNnu8sFXTdlhh" },
  { clientId: "1pra1_social", driveId: "1VuSl_6uUH7bHtXF44-eZArqdYqVWYoYf" },
  { clientId: "1pra1_social", driveId: "16OW1ycRO3PizPtCbBoXz9xfnANKXZmao" },
  { clientId: "1pra1_social", driveId: "1wXrECXjjdLiMUnz6RF9zPyr__8CjTES8" },
  { clientId: "1pra1_social", driveId: "1uchzG5LjbWlwCxS2r7EKOKKiIgOG1luM" },
  { clientId: "1pra1_social", driveId: "19adv_nU2pJR4klVyJ7FZqXpLcUzhcJrZ" },
  { clientId: "1pra1_social", driveId: "1jGv35WaIif9wdvGtSOwvNocsuobBwH9q" },
  { clientId: "1pra1_social", driveId: "1v0UIUr9J1pUc07tbIyQh03wbyNWMu2P9" },
  { clientId: "1pra1_social", driveId: "1P8KrOuwfs-TEM8SSNtGn0d2mtqQJTK0h" },
  { clientId: "1pra1_social", driveId: "1LJQGecsdYo72Y9nGSrUavfwjvDCspUeA" },
  { clientId: "1pra1_social", driveId: "1DG7z6-o97jGl14MN_-FXcHGiMde1KOjj" },
  { clientId: "1pra1_social", driveId: "1xcXMLeS9hGQiQXXKKAl35ocIgw0Fyann" },
  { clientId: "1pra1_social", driveId: "1Ml8Pm9mgR7zf9XNzWxb9fdk1BvmQmJYt" },
  // Projeto Draft (Social)
  { clientId: "projeto_draft", driveId: "1-Csg49jsQEn3kgNnM3dDtiF5iUneCror", thumbnail: "/thumbs/projeto-draft.webp" },
  // Cruzeiro Basquete (Social)
  { clientId: "cruzeiro_basquete", driveId: "1ZxVeqmWX8xQPZpBnmlsk5TQdzb-RiYQ4" },
  { clientId: "cruzeiro_basquete", driveId: "1_f5PEY0zbC5KL1maHQRjcuaGke2L-Xat" },
  { clientId: "cruzeiro_basquete", driveId: "1D4z_d_od0DOlSOB_fOQPLy4qG6nbJKGv" },
  // 1pra1 — IA (Motion & IA)
  { clientId: "1pra1_motion", driveId: "1vtuwD7adlTv9xoFP_Zh0C7tMn2Epx3k5" },
  { clientId: "1pra1_motion", driveId: "1O4gxYyRAxqIAXvbgfLdabFOjBqcVBOC0" },
  { clientId: "1pra1_motion", driveId: "1LVVxEmrP-N28X_w_Zgz7dNJc5QXRpfru" },
  // Group Phoenix — VSL
  { clientId: "fenix_vsl", driveId: "1gg-GRNMkCxSu_7qUPBuQlqSn6lgZhZES" },
  { clientId: "fenix_vsl", driveId: "1PT9uiNzHya0hSFDnudbEYkQkocyjq_gk" },
  { clientId: "fenix_vsl", driveId: "11noURsC5U0aEh5ayDTJip8ZoDbby2vHh", horizontal: true },
  { clientId: "fenix_vsl", driveId: "1ImRRGbxwR2jbeDMBsm9r9F-hY8X74kIR", horizontal: true },
  { clientId: "fenix_vsl", driveId: "17xlLvnC6nxgJPbOWgaQzG7MGxoO-V-Qo", horizontal: true },
  { clientId: "fenix_vsl", driveId: "1ajRCjQIdHr6go0QiNggCx9XpU2qdRqtI", horizontal: true },
];

export const clientById = (id: string) => clients.find((c) => c.id === id);

// Player do Google Drive.
export const driveEmbed = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`;

// Thumbnail do Google Drive — 600px basta para os cards do grid.
export const driveThumb = (fileId: string) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
