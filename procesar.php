<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');

$escape = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$renderPage = static function (int $status, string $title, string $message) use ($escape) {
    http_response_code($status);
    ?>
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= $escape($title) ?> | POP!</title>
        <style>
          body { margin: 0; padding: 2rem; color: #201721; background: #fff8fc; font: 1rem/1.6 Arial, sans-serif; }
          main { max-width: 680px; margin: 8vh auto; padding: 2rem; border: 2px solid #201721; box-shadow: 8px 8px 0 #ff007f; }
          h1 { margin-top: 0; }
          a { color: #5729c7; }
        </style>
      </head>
      <body>
        <main>
          <h1><?= $escape($title) ?></h1>
          <p><?= $message ?></p>
          <p><a href="index.html#pop-today">Volver a POP TODAY</a></p>
        </main>
      </body>
    </html>
    <?php
    exit;
};

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    $renderPage(405, 'Método no permitido', 'Este formulario solo acepta envíos POST.');
}

$readField = static function (string $key): string {
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
};

$name = strip_tags($readField('nombre'));
$email = $readField('email');
$artist = $readField('artista');
$message = strip_tags($readField('mensaje'));
$allowedArtists = [
    'Andy Warhol',
    'Roy Lichtenstein',
    'Richard Hamilton',
    'Claes Oldenburg',
    'James Rosenquist',
];

if ($name === '' || strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !in_array($artist, $allowedArtists, true) || $message === '' || strlen($message) > 4000) {
    $renderPage(422, 'Revisá tus datos', 'No se pudo recibir el formulario. Comprobá los campos e intentá nuevamente.');
}

$safeName = $escape($name);
$safeArtist = $escape($artist);
$safeMessage = nl2br($escape($message));
$renderPage(200, '¡Mensaje recibido!', "Gracias, {$safeName}. Recibimos tu opinión sobre {$safeArtist}.<br><br>{$safeMessage}");