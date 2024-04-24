import requests
import pandas as pd

url = "https://orgs.studentinvolvement.ufl.edu/api/Organizations/GetOrganizationList"

payload = ""
headers = {
    "authority": "orgs.studentinvolvement.ufl.edu",
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "cookie": "nmstat=6a1cccf8-d9d4-9909-75de-27ae2b70b735; _fbp=fb.1.1695734655128.563207668; _hjSessionUser_1727708=eyJpZCI6IjZlNmZmMjg0LTc2MzQtNWU3OS1hN2FmLWE3MjQyY2Y4NjlmZiIsImNyZWF0ZWQiOjE2OTg2MDY0NzA3MDUsImV4aXN0aW5nIjpmYWxzZX0=; PS_DEVICEFEATURES=width:1920 height:1080 pixelratio:1 touch:0 geolocation:1 websockets:1 webworkers:1 datepicker:1 dtpicker:1 timepicker:1 dnd:1 sessionstorage:1 localstorage:1 history:1 canvas:1 svg:1 postmessage:1 hc:0 maf:0; fpestid=vcQWvkOl2Oq8MAKo0tUr8IyjOJzR0sglY2fARoZlhgThmIRflwZGunMV0b_gCISFeTobIQ; _cc_id=8d4896280c40cbaeb197d546fbb1bfd3; _ga_9NRQ0C0ENF=GS1.1.1705529866.1.1.1705529876.0.0.0; _ga_HTTE8CXHBW=GS1.2.1705692496.2.0.1705692496.0.0.0; _ga_FXD0SCCF4H=GS1.2.1705692504.1.1.1705692697.0.0.0; _ga_C25W2V1RN9=GS1.1.1705931133.2.1.1705931152.0.0.0; _ga_2Q999W1SVS=GS1.2.1705978970.1.0.1705978970.60.0.0; _ga_QCV3W0NMBY=GS1.1.1705978969.1.1.1705979047.60.0.0; _ga_0VPYHKKDLG=GS1.1.1706274662.1.1.1706274749.0.0.0; _ga_ZVES04YMWK=GS1.1.1709318465.242.0.1709318465.0.0.0; _ga=GA1.2.148190151.1695570080; _gid=GA1.2.1547718875.1709384087; _ga_PBP1HBEZ51=GS1.2.1709384087.3.1.1709384835.0.0.0",
    "referer": "https://orgs.studentinvolvement.ufl.edu/Organizations",
    #"sec-ch-ua": ""Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}

response = requests.request("GET", url, data=payload, headers=headers)

data = response.json()

df = pd.json_normalize(data)

wantedData = ['OrganizationName', 'OrganizationDescription']

df = df[wantedData]

df.to_csv('UFclubs.csv')