import pytest


@pytest.mark.django_db
def test_healthcheck(client):
    response = client.get('/ht/', headers={'Accept': 'application/json'})
    assert response.status_code == 200
    assert response.json() == {'DatabaseBackend': 'working'}
