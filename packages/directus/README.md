https://github.com/directus/directus/issues/6321

SELECT setval('web3_grants_id_seq',(SELECT GREATEST(MAX(id)+1,nextval('web3_grants_id_seq'))-1 FROM web3_grants));

SELECT setval('web3_grants_web3_blockchains_id_seq',(SELECT GREATEST(MAX(id)+1,nextval('web3_grants_web3_blockchains_id_seq'))-1 FROM web3_grants_web3_blockchains));

SELECT setval('web3_grants_web3_use_cases_id_seq',(SELECT GREATEST(MAX(id)+1,nextval('web3_grants_web3_use_cases_id_seq'))-1 FROM web3_grants_web3_use_cases));

SELECT setval('web3_grants_web3_categories_id_seq',(SELECT GREATEST(MAX(id)+1,nextval('web3_grants_web3_categories_id_seq'))-1 FROM web3_grants_web3_categories));
