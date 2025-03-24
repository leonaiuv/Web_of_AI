import './styles/globals.css'

export const metadata = {
  title: '项目路线图展示',
  description: '精美且详细的项目路线图展示工具',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
} 