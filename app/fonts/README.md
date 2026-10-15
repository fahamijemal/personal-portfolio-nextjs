# Bundled portfolio fonts

These unmodified Geist and Geist Mono Latin variable font files preserve the typography already served by the personal portfolio. They use the SIL Open Font License in [OFL.txt](./OFL.txt).

Source files retrieved through verified HTTPS from the existing public deployment:

- Geist: `https://fahami.ifaatechnologies.tech/_next/static/media/caa3a2e1cccd8315-s.p.853070df.woff2`
- Geist Mono: `https://fahami.ifaatechnologies.tech/_next/static/media/797e433ab948586e-s.p.dbea232f.woff2`

The upstream license was retrieved from `https://raw.githubusercontent.com/google/fonts/main/ofl/geist/OFL.txt`; the corresponding `ofl/geistmono/OFL.txt` is identical. Upstream project: <https://github.com/vercel/geist-font>.

SHA-256:

```text
a29f900a6d603e989449327956e7ac61ea3e6b26ca7426f64e7cccf2cd4aed37  geist-latin.woff2
b7ac144b394cbd81052d6397ec0c33397977b1d7e9bc095e744e652a378c6fb3  geist-mono-latin.woff2
```

`next/font/local` serves these files from the deployment; builds do not require Google Fonts access. The primary font is preloaded. The mono font loads when code content needs it.
