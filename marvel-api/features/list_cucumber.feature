Feature: Test List
  The list should return 15 comics

  Scenario: First 15 comics are returned
  When I go to /list
  Then I should get the first 15 comics

  Scenario: 15 comics are returned for page
  When I go to /list with page 2 as argument
  Then I should get 15 comics

  Scenario: no comics are returned if page is to big
  When I go to /list with page 1000 as argument
  Then I should get 0 comics



