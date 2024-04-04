import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "",
    SERVER_KEY: ""
  },
  images: {
    remotePatterns: [
      {
        hostname: 'tailwindui.com'
      }
    ]
  }
}

export default withNextIntl(nextConfig) 