# save sql
docker exec smart-farm-server-main-linux_sql-1 /usr/bin/mysqldump -u root --password=a10955 smart_farm_db > ./db.sql

CLIENT_ID= [YOUR CLIENT ID]
CLIENT_SECRET= [YOUR CLIENT SECRET]
REFRESH_TOKEN= [YOUR REFRESH TOKEN]

# get access token
IP=$(curl \
    --request POST \
    --data "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&refresh_token=$REFRESH_TOKEN&grant_type=refresh_token" \
    https://accounts.google.com/o/oauth2/token)

ACCESS_TOKEN=$(echo $IP | jq -r .access_token)

# upload
curl --request POST \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "metadata={name : 'db'};type=application/json;charset=UTF-8" \
  -F "file=@db.sql;type=application/sql" \
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"