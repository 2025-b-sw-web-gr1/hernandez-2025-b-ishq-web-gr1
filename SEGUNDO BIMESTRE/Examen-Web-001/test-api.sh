#!/bin/bash
# Script de prueba para la API de examen-web-002
# Ejecutar desde PowerShell o GitBash

echo "=== PRUEBAS API examen-web-002 ==="
echo ""

# 1. Crear un equipo
echo "1. Crear equipo Real Madrid:"
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Real Madrid","country":"España"}'
echo -e "\n\n"

# 2. Crear otro equipo
echo "2. Crear equipo Barcelona:"
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name":"Barcelona","country":"España"}'
echo -e "\n\n"

# 3. Obtener todos los equipos
echo "3. Obtener todos los equipos:"
curl http://localhost:3000/teams
echo -e "\n\n"

# 4. Obtener equipo específico
echo "4. Obtener equipo con ID 1:"
curl http://localhost:3000/teams/1
echo -e "\n\n"

# 5. Crear un jugador
echo "5. Crear jugador Vinicius Jr en equipo 1:"
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Vinicius Jr","position":"Delantero","teamId":1}'
echo -e "\n\n"

# 6. Crear otro jugador
echo "6. Crear jugador Rodrygo en equipo 1:"
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Rodrygo","position":"Delantero","teamId":1}'
echo -e "\n\n"

# 7. Obtener todos los jugadores
echo "7. Obtener todos los jugadores:"
curl http://localhost:3000/players
echo -e "\n\n"

# 8. Obtener jugadores de un equipo específico
echo "8. Obtener jugadores del equipo 1:"
curl http://localhost:3000/teams/1/players
echo -e "\n\n"

# 9. Actualizar equipo
echo "9. Actualizar equipo 1:"
curl -X PUT http://localhost:3000/teams/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Real Madrid CF","country":"España"}'
echo -e "\n\n"

# 10. Actualizar jugador
echo "10. Actualizar jugador 1:"
curl -X PUT http://localhost:3000/players/1 \
  -H "Content-Type: application/json" \
  -d '{"position":"Extremo Izquierdo"}'
echo -e "\n\n"

# 11. Eliminar jugador
echo "11. Eliminar jugador 2:"
curl -X DELETE http://localhost:3000/players/2
echo -e "\n\n"

# 12. Verificar que el jugador fue eliminado
echo "12. Obtener jugadores restantes del equipo 1:"
curl http://localhost:3000/teams/1/players
echo -e "\n\n"

echo "=== FIN DE PRUEBAS ==="
