Feature: Test Change
  The comic should have the right favorite value

  Scenario: The comic 323 is not favorite
  When I go to /comic with marvel_id 323
  Then the favorite should be false

  Scenario: Calling /comic_modify changes the favorite status
  When I go to /comic_modify with marvel_id 323
  And I go to /comic with marvel_id 323
  Then the favorite should be true