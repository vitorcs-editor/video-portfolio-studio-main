// Dados do portfólio — para adicionar um vídeo, basta incluir uma linha em `videos`.
// Os arquivos do Google Drive precisam estar compartilhados como "Qualquer pessoa com o link".

export type VideoCategory = "igaming" | "vsl" | "motion" | "ads" | "social";

export const CATEGORIES: VideoCategory[] = ["igaming", "vsl", "motion", "ads", "social"];

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
  { id: "fenix_ads", name: "Group Phoenix", niche: "ads", logo: "/icons/groupphoenix.png" },
  { id: "fenix_vsl", name: "Group Phoenix", niche: "vsl", logo: "/icons/groupphoenix.png" },
  { id: "1pra1_bet", name: "1pra1.bet", niche: "igaming", logo: "/icons/1pra1.png" },
  { id: "1pra1_motion", name: "1pra1.bet", niche: "motion", logo: "/icons/1pra1.png" },
  { id: "projeto_draft", name: "Projeto Draft", niche: "social", logo: "/icons/projeto-draft.webp" },
  { id: "cruzeiro_basquete", name: "Cruzeiro Basquete", niche: "social", logo: "/icons/cruzeiro-basquete.webp" },
  { id: "1pra1_social", name: "1pra1.bet", niche: "social", logo: "/icons/1pra1.png" },
];

export const videos: Video[] = [
  // 1pra1_bet
  { clientId: "1pra1_bet", driveId: "1gxFfZL1jyYny5WEJPxwIfQumCaDR_dbZ" },
  { clientId: "1pra1_bet", driveId: "1T2lqpfZJtG-8BJ77NRHS-xALPwEPHVm5" },
  { clientId: "1pra1_bet", driveId: "129Ah3ujYY2wDrBXzEAixUyGw59I0Sbiq" },
  { clientId: "1pra1_bet", driveId: "1AZoqNPjvP7OeqN_BttQ75KppPQErTYRu" },
  { clientId: "1pra1_bet", driveId: "1KW5drgoZnVxK2rw6KL7Kfa1ELAy9afZU" },
  { clientId: "1pra1_bet", driveId: "1Lfwolbtyk8BWxzf7XlVlF0tK9sd_7gtP" },
  { clientId: "1pra1_bet", driveId: "11x8rikTbE-1eHtqmnMgrsEIp1bj3JZFz" },
  { clientId: "1pra1_bet", driveId: "1kcnaZ5V4e6PrjlqA87j515Q1M9O6Gj3e" },
  // 1pra1_motion
  { clientId: "1pra1_motion", driveId: "1HxAy5GdGXdRGFpTlnHmfcQTJCF59yvIJ" },
  { clientId: "1pra1_motion", driveId: "1_g_Xj61kaQr2XP3FSTKclo12nNJOUBCZ" },
  { clientId: "1pra1_motion", driveId: "1AGEsJ5D71YLIQTNJH_XIX9ml_kkKLlla" },
  { clientId: "1pra1_motion", driveId: "1AZoqNPjvP7OeqN_BttQ75KppPQErTYRu" },
  // projeto_draft
  { clientId: "projeto_draft", driveId: "1TmmeqsfNGqqG-ICzzqHvytNQ3Vw37FSo", thumbnail: "/thumbs/projeto-draft.webp" },
  // cruzeiro_basquete
  { clientId: "cruzeiro_basquete", driveId: "1j8Gryyp0-YbtWQHUy-ZQgH6NdkfXsHyw" },
  { clientId: "cruzeiro_basquete", driveId: "1uot6SjYDxBQQrOWlpOuTipBcQ_sSFS2W", thumbnail: "/thumbs/cruzeiro-basquete.webp" },
  { clientId: "cruzeiro_basquete", driveId: "1CAo5vTb5p0OOq-9CdQGjS4wEKfnrRbns" },
  // 1pra1_social
  { clientId: "1pra1_social", driveId: "1KW5drgoZnVxK2rw6KL7Kfa1ELAy9afZU" },
  { clientId: "1pra1_social", driveId: "1Lfwolbtyk8BWxzf7XlVlF0tK9sd_7gtP" },
  { clientId: "1pra1_social", driveId: "11x8rikTbE-1eHtqmnMgrsEIp1bj3JZFz" },
  { clientId: "1pra1_social", driveId: "1kcnaZ5V4e6PrjlqA87j515Q1M9O6Gj3e" },
  // fenix_ads
  { clientId: "fenix_ads", driveId: "16vh8lHJtgJs0orRZOwpqkBlOVxbSG5-x" },
  { clientId: "fenix_ads", driveId: "15-7hhNBHbEHpqCSCWmfmW2_fn0tddXhm" },
  { clientId: "fenix_ads", driveId: "1fDdJ4TaWy0zIlrBw27GNm9KwTDMSlbou" },
  { clientId: "fenix_ads", driveId: "1LjRKPbaBQQuEPQGDol7ZGLVcJO2EGA3g" },
  { clientId: "fenix_ads", driveId: "1lJDTPrJZNzGeGjuBDKKJYKYJxuJJxDG0" },
  { clientId: "fenix_ads", driveId: "1jUft6etXETQSku_nTr6DjrZt_rO9Cgl5" },
  { clientId: "fenix_ads", driveId: "1iol_L1BpbVJximPemAHX90aNQ4b5h3OY" },
  { clientId: "fenix_ads", driveId: "1jVMH7gQSiYbDAcIuzmEuLg6XtTGxAXmd" },
  { clientId: "fenix_ads", driveId: "1mM1GYkZUYcwi9b3K-HQqbPWnwj1E4YMW" },
  { clientId: "fenix_ads", driveId: "1Ufex1neFqGHJWH3wl1_gbwkrlkhCgpa1" },
  { clientId: "fenix_ads", driveId: "1H4U2PaYvHvP3LV0VA3NBexM9Z-e2Hx7V" },
  { clientId: "fenix_ads", driveId: "1qdEOd1GbOqJB6oD5w1AZ1y5nEofYvGRj" },
  { clientId: "fenix_ads", driveId: "1Mg3Bd7a29D6mkL6rkIBlc-i4r3XwzozT" },
  // fenix_vsl
  { clientId: "fenix_vsl", driveId: "1hEQOG_8z83qxfNGvYDKIoBUh56IiGSVX" },
];

export const clientById = (id: string) => clients.find((c) => c.id === id);

// Player do Google Drive.
export const driveEmbed = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`;

// Thumbnail do Google Drive — 600px basta para os cards do grid.
export const driveThumb = (fileId: string) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
