@echo off
cls
chcp 65001
echo 生成协议... & pbjs -t static-module -w commonjs -o ../assets/script/netmsgs/msgs.js ./*.proto & echo 成功！ & echo 生成类型声明... & pbts -o ../assets/script/netmsgs/msgs.d.ts ../assets/script/netmsgs/msgs.js & echo 成功！ & echo 最后修改... & node rehead.js & echo 完成！！