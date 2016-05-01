#!/bin/bash

message="Health check failed! j4n.io seems not to be healthy."
color="danger"

npm run health-check --silent

if [ $? == 0 ]; then
  message="Health check passed! j4n.io is running."
  color="good"
fi

curl -X POST -H "Cache-Control: no-cache" -d "{\"text\": \"\", \"username\": \"Health Check\", \"attachments\": [{\"text\": \"$message\", \"color\": \"$color\"}]}" "https://hooks.slack.com/services/T04F7AA9R/B15724NS0/$SLACK_TOKEN"
