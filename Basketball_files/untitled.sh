
#!/bin/bash
# desc: download resource
# author: John

mydir=`pwd`

while read line
do
{
    if [ -n "$line" ]
    then
        cd $mydir
        url=$(echo "$line" | tr -d '\r')
        picdir=$(echo $url | sed -r 's/http:\/\///g')
        picname=$(echo ${picdir##*/})
        picpath=$(echo ${picdir%/*})
        mkdir -p $picpath
        cd $picpath
        wget -O $picname `echo $url`
    fi
}
done < $1
exit 0