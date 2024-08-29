<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Domino Configurator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="container">
        <header>
            <h1>Domino Configurator</h1>
            <div class="controls">
                <button id="addList">Añadir Lista</button>
                <button id="addVariable">Añadir Variable</button>
                <button id="addVisor">Añadir Visor</button>
            </div>
            <div class="controls">
                <button id="undo">Deshacer</button>
                <button id="redo">Rehacer</button>
                <button id="saveSession">Guardar Sesión</button>
                <button id="loadSession">Cargar Sesión</button>
            </div>
        </header>
        <div id="workspace">
            <div id="variablesFrame" class="frame">
                <h2>Variables</h2>
            </div>
            <div id="listsFrame" class="frame">
                <h2>Listas</h2>
            </div>
            <div id="visorsFrame" class="frame">
                <h2>Visores</h2>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
