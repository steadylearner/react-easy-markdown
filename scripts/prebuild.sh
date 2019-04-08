echo "> Start transpiling ES2015"
echo ""
./node_modules/.bin/babel src -d lib --ignore src/__tests__
echo ""
echo "> Complete transpiling ES2015"
