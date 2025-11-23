function Footer() {
  return (
    <footer className="mt-12 border-t bg-white dark:bg-gray-900">
      <div className="container mx-auto p-4 text-sm text-gray-600 dark:text-gray-200">
        © {new Date().getFullYear()} GameHost — embeds from GameDistribution
      </div>
    </footer>
  )
}

export default Footer
