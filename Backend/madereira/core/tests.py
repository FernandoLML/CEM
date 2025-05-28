from django.test import TestCase

# Create your tests here.
import pytest

@pytest.mark.django_db
def test_example():
    assert 1 + 1 == 2
