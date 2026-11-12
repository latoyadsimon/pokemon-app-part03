docker build -t react-img .

docker run --rm \
  -p 5173:5173 \
#   setting this present directory as our /app
  -v "$(pwd)":/app \
#   makes sure the node modules dont get pulled into our container
  -v /app/node_modules \
  --name react-container \
  react-img