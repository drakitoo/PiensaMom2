/**
 * Componente Textarea reutilizable
 * Soporta labels, errores y diferentes tamaños con diseño minimalista
 */
function Textarea({
  label,
  error,
  id,
  rows = 3,
  className = '',
  ...props
}) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`
          w-full px-3 py-2 text-sm text-gray-900 bg-white
          border border-gray-200 rounded-lg resize-none
          placeholder:text-gray-400
          focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Textarea
