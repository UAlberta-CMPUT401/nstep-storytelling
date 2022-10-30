# testing_utils.py

def at_least_one_set(response):
    assert response.json().get("total") > 0