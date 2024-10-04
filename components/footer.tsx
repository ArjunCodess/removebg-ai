import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground p-4 w-full mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm sm:text-base">
                    &copy; 2024 RemoveBG. Made with ❤️ by{' '}
                    <a
                        href="https://github.com/arjuncodess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-secondary-foreground transition-colors"
                    >
                        ArjunCodess
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}