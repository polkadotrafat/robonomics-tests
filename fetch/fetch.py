import logging
from robonomicsinterface import Account, Datalog

# device 1 address
address = "4HirffdBLGDuFDDJEeh83yyj8tjBctDHv8EukPiNjjMtALHB"

logging.info("Start")

# 12 word seed phrase of Alice account
seed: str = "bottom drive obey lake curtain smoke basket hold race lonely fit walk"

account_with_seed = Account(seed=seed, remote_ws="wss://mercury.frontier.rpc.robonomics.network/")
datalog = Datalog(account_with_seed)

item = datalog.get_item(address)

print(item)