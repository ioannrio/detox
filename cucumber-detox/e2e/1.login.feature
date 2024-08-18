@1.login
Feature: Login Test
  Login into app

  Scenario: Login
    Given Open login page
    When User tries to login only with email
    Then User stays on login page

    When User tries to login with wrong email
    Then User stays on login page

    When User tries to login only with password
    Then User stays on login page

    When User tries to login with wrong password
    Then User stays on login page

    When User tries to login without email and password
    Then User stays on login page

    When User enters credentials
    Then User is logged in
