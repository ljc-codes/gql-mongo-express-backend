import os 
import requests
import time 
import random 
import string 

create_user_mutation = '''
    mutation {
        createUser(userInput: {email : "json@gmail.com", password :"charles"}){
            _id
            email
            password
        }   
    }'''

create_company_mutation = lambda title,description,price,date : '''
    mutation {
        createCompany(CompanyInput: {title : "%s", description:"%s", price :%s,date:"%s"}){
            _id
            title
            description
            price
        }
    }'''%(title,description,price,date)

create_thesis_mutation = lambda company_id,content : '''
    mutation {
        createThesis(ThesisInput : {companyId: "%s", content :"%s"}){
            _id
            content
            createdAt
            updatedAt
        }
    }'''%(str(company_id),str(content))

login_query = '''
    query {
        login(email : "json@gmail.com", password : "charles"){
            token
            tokenExpiration
        }
    }'''

theses_query = '''
    query {
        theses{
            _id
            user{
                _id
            }
            content
            createdAt
            updatedAt
        }
    }'''
companies_query = '''
    query{
        companies{
            _id
            title
            description
            price 
            date            
        }
    }'''




if __name__ == '__main__':


    api_url = 'http://localhost:4000/graphql'
    
    # Create User Request
    print('> Attempting to create account')
    r = requests.post(api_url, json = {'query' : create_user_mutation})
    if r.status_code == 200: print('\tAccount already Exists!'); print(r.json())
    else: print('\tAccount created.')
    
    # Login User and get token   
    r = requests.post(api_url, json= {'query' : login_query})
    token, token_expiration = dict(r.json())['data']['login']['token'],dict(r.json())['data']['login']['tokenExpiration']
    if r.status_code == 200:
        print('Logged in')
        print('\t token    : %s\nexpires in: %s\n' % (token,token_expiration))
        #print(r.json())


    tickers = [random.choice(string.ascii_letters) for i in range(15)]
    companies_data = [(ticker,'desc','9.99','2020-04-01T22:18:16.950Z')\
                      for ticker in tickers]

    # Creates Companies
    company_ids = []
    for data in companies_data:
        r = requests.post(api_url,
                json    = {'query': create_company_mutation(*data)},
                headers = {'Authorization': 'Bearer ' + token})
                #print('**')
        #print(r.content)
        if r.status_code == 200:
            company_id = dict(r.json())['data']['createCompany']['_id']
            print('Company Created for: %s'%(str(data)))
            #print(r.json())
            company_ids.append(company_id)
        #print(r.content)
        time.sleep(0.1)
    
    theses_data = [(company_id,str(''.join([random.choice(string.ascii_letters)for i in range(3000)]))) 
                    for company_id in company_ids]

    #print(theses_data)

    # Creates Theses
    for thesis_data in theses_data:

        r = requests.post(api_url,
                json    = {'query': create_thesis_mutation(*thesis_data)},
                headers = {'Authorization': 'Bearer ' + token})
        #print(r.content)
        if r.status_code == 200:
            print('Thesis Created for %s'%(str(data)))
            #print(r.json())
        time.sleep(0.1)
    


    # Print Begin Testing for objects
    print('Company:')
    r = requests.post(api_url,
                json = {'query': companies_query},
                headers = {'Authorization' :'Bearer ' + token})
    if r.status_code == 200:
        print(r.content)
    
    print('Theses:')
    r = requests.post(api_url,
                json = {'query': theses_query},
                headers = {'Authorization' :'Bearer ' + token})
    if r.status_code == 200:
        print(r.content)
