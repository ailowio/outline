# 📸 Instruções para Inserir Caricaturas dos Integrantes

## 📍 Localização dos Arquivos

Coloque as caricaturas dos integrantes na pasta `/public/` do projeto com os seguintes nomes:

```
/public/
  ├── caricatura-arthur.svg (ou .png)
  ├── caricatura-lucas.svg (ou .png)
  ├── caricatura-pedro.svg (ou .png)
  └── caricatura-romulo.svg (ou .png)
```

## 🎨 Especificações Técnicas

### Formato Recomendado: **SVG**
- ✅ **Vantagens**: Vetorial (escalável sem perda de qualidade), leve, suporta transparência
- 📐 **Tamanho ideal**: Qualquer tamanho (vetorial se adapta)
- 🎯 **Aspecto**: Quadrado (1:1) é recomendado para melhor visualização no jogo

### Formato Alternativo: **PNG**
- ✅ **Vantagens**: Suporta transparência, boa qualidade
- 📐 **Tamanho mínimo**: 200x200px
- 📐 **Tamanho ideal**: 400x400px ou maior
- 🎯 **Aspecto**: Quadrado (1:1) é recomendado
- ⚠️ **Importante**: Fundo transparente obrigatório

## 🔄 Como Atualizar no Código

Após adicionar os arquivos na pasta `/public/`, o código já está configurado para usar automaticamente. Os arquivos são referenciados em:

**Arquivo**: `src/components/game/CharacterSelector.tsx`

As imagens são carregadas automaticamente quando você adiciona os arquivos com os nomes corretos na pasta `/public/`.

### Se precisar atualizar manualmente:

1. Abra `src/components/game/CharacterSelector.tsx`
2. Localize o array `integrantes` (linhas 18-43)
3. Substitua os caminhos `'/logo.svg'` pelos caminhos corretos:
   ```typescript
   {
     id: 'arthur',
     name: 'Arthur',
     image: '/caricatura-arthur.svg', // ← Atualize aqui
     instrument: 'Baixo'
   }
   ```

## ✅ Checklist

- [ ] Caricatura do Arthur adicionada em `/public/caricatura-arthur.svg` (ou .png)
- [ ] Caricatura do Lucas adicionada em `/public/caricatura-lucas.svg` (ou .png)
- [ ] Caricatura do Pedro adicionada em `/public/caricatura-pedro.svg` (ou .png)
- [ ] Caricatura do Rômulo adicionada em `/public/caricatura-romulo.svg` (ou .png)
- [ ] Todas as imagens têm fundo transparente
- [ ] Todas as imagens estão em formato quadrado (aspecto 1:1)

## 🎮 Como Funciona no Jogo

As caricaturas aparecem:
1. **No seletor de personagens**: Antes de iniciar o jogo
2. **Como cabeça da cobra**: Durante o jogo (substitui o quadrado verde padrão)

## 💡 Dicas

- Use **SVG** sempre que possível para melhor qualidade e performance
- Mantenha as caricaturas com **aspecto quadrado** para melhor visualização
- Certifique-se de que o **fundo é transparente** para não interferir no jogo
- Teste as imagens após adicionar para garantir que estão carregando corretamente

