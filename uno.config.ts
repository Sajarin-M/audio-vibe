import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  theme: {
    fontSize: {
      xxs: ['0.68rem', '0.96rem'],
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        default: 'Prompt',
      },
    }),
    presetIcons(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
