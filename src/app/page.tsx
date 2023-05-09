import Image from 'next/image'
import sty from './page.module.scss'
import Link from 'next/link'

export default function Home() {
  return <>
    <header className={sty.header}>
      <div className={sty.headerContainer}>
        <div className={sty.title}>
          <h1 className={sty.titleName}>Lab Management</h1>
        </div>
        <nav className={sty.nav}>
          <Link href="/login">
            <span>Login</span>
          </Link>
          <Link href="/signup" className={sty.signup}>
            <span>Sign Up</span>
          </Link>
        </nav>
      </div>
    </header>
    <main className={sty.main}>
      <div className={sty.container}>
        <h1>Create an <span>account</span> to manage Labs</h1>
        <Link href="/signup" className={sty.signupButton}>
          <span>Start Managing</span>
        </Link>
      </div>
    </main>
  </>
}
