file=/tmp/db.dump
minimumsize=8
actualsize=$(du -k "$file" | cut -f 1)
if [ $actualsize -ge $minimumsize ]; then
    echo size is over $minimumsize kilobytes
    exit 0
else
    echo size is under $minimumsize kilobytes
    exit 1
fi
