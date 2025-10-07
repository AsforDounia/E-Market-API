
const errorHandler = (err, req, res, next) => {
  console.error('Erreur capturée:', err);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: errors
    });
  }

  // Erreur de cast (ID MongoDB invalide)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID invalide',
      error: err.message
    });
  }

  // Erreur de duplication (email déjà existant par exemple)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `Le champ ${field} existe déjà`,
      error: 'Duplicate key error'
    });
  }

  // Erreur générique
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

export default errorHandler;