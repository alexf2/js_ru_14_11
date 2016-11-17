rem git remote add upstream https://github.com/romabelka/js_ru_14_11
git fetch upstream
git checkout master
git merge upstream/master
git status
git commit -m "Merging upstream"
git push origin master
