# Vitor Carvalho — Portfólio

Site de portfólio de edição de vídeo publicado em [vitorcs.com.br](https://www.vitorcs.com.br).

Página única feita com React, TypeScript, Vite, Tailwind CSS e framer-motion, hospedada na Vercel.

## Rodando localmente

Requer Node.js 18 ou mais recente.

```sh
npm install
npm run dev      # servidor local em http://localhost:8080
npm run lint     # ESLint
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção
```

## Onde editar

| O que | Onde |
| --- | --- |
| Vídeos e clientes do portfólio | `src/data/portfolio.ts` |
| Todos os textos do site (PT-BR, EN, ES) | `src/lib/lang.tsx` |
| WhatsApp e URL do site | `src/lib/contact.ts` |
| Seções da página | `src/components/` (Hero, Clients, Portfolio, Services, About, Stack, Contact, Footer) |
| Cores, fontes e tema | `src/index.css` (variáveis de cor) e `tailwind.config.ts` (fontes) |
| Imagens, logos e thumbnails | `public/` |

### Adicionando um vídeo

1. No Google Drive, compartilhe o arquivo como **"Qualquer pessoa com o link"**.
2. Copie o ID do arquivo: o trecho entre `/d/` e `/view` no link.
3. Adicione uma linha em `videos` em `src/data/portfolio.ts`:

```ts
{ clientId: "fenix_ads", driveId: "ID_DO_ARQUIVO" },
```

A thumbnail vem do próprio Drive. Para usar uma imagem sua, coloque o arquivo em `public/thumbs/` (de preferência em WebP) e informe `thumbnail: "/thumbs/nome.webp"`. Vídeos são verticais (9:16) por padrão; para um vídeo horizontal, adicione `horizontal: true`.

Para um cliente novo, adicione-o em `clients` no mesmo arquivo, com o logo em `public/icons/`.

### Formulário de orçamento

O formulário não salva dados: ele monta uma mensagem e abre uma conversa no WhatsApp com o número definido em `src/lib/contact.ts`.

### Imagem de compartilhamento

`public/og-image.png` é a imagem exibida ao compartilhar o link. O modelo dela fica em `design/og-image.html`: abra no navegador e capture a área de 1200×630.
