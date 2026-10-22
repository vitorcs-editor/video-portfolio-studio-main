// Dados do portfólio — para adicionar um vídeo, basta incluir uma linha em `videos`.
// Os arquivos do Google Drive precisam estar compartilhados como "Qualquer pessoa com o link".

export type VideoCategory = "igaming" | "vsl" | "motion" | "ads" | "social";

export const CATEGORIES: VideoCategory[] = ["vsl", "social"];

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
  { id: "fenix_vsl", name: "Group Phoenix", niche: "vsl", logo: "/icons/groupphoenix.png" },
  { id: "cruzeiro_basquete", name: "Cruzeiro Basquete", niche: "social", logo: "/icons/cruzeiro-basquete.webp" },
];

export const videos: Video[] = [
  // Group Phoenix — VSL
  { clientId: "fenix_vsl", driveId: "1gg-GRNMkCxSu_7qUPBuQlqSn6lgZhZES" },
  { clientId: "fenix_vsl", driveId: "1PT9uiNzHya0hSFDnudbEYkQkocyjq_gk" },
  { clientId: "fenix_vsl", driveId: "11noURsC5U0aEh5ayDTJip8ZoDbby2vHh", horizontal: true },
  { clientId: "fenix_vsl", driveId: "1ImRRGbxwR2jbeDMBsm9r9F-hY8X74kIR", horizontal: true },
  { clientId: "fenix_vsl", driveId: "17xlLvnC6nxgJPbOWgaQzG7MGxoO-V-Qo", horizontal: true },
  { clientId: "fenix_vsl", driveId: "1ajRCjQIdHr6go0QiNggCx9XpU2qdRqtI", horizontal: true },
  // Cruzeiro Basquete — Social Media
  { clientId: "cruzeiro_basquete", driveId: "1ZxVeqmWX8xQPZpBnmlsk5TQdzb-RiYQ4" },
  { clientId: "cruzeiro_basquete", driveId: "1_f5PEY0zbC5KL1maHQRjcuaGke2L-Xat" },
  { clientId: "cruzeiro_basquete", driveId: "1D4z_d_od0DOlSOB_fOQPLy4qG6nbJKGv" },
];

export const clientById = (id: string) => clients.find((c) => c.id === id);

// Player do Google Drive.
export const driveEmbed = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`;

// Thumbnail do Google Drive — 600px basta para os cards do grid.
export const driveThumb = (fileId: string) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
