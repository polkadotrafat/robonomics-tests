import logging
from robonomicsinterface import Account, Datalog

address = "4GzMLepDF5nKTWDM6XpB3CrBcFmwgazcVFAD3ZBNAjKT6hQJ"

logging.info("Start")

# 12 word seed phrase of Alice account
seed: str = "bottom drive obey lake curtain smoke basket hold race lonely fit walk"

account_with_seed = Account(seed=seed, remote_ws="ws://127.0.0.1:9944")
datalog = Datalog(account_with_seed)

item = datalog.get_item(address)

print(item)