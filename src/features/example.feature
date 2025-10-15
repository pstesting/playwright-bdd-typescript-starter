Feature: Example Test Suite
  As a user
  I want to test web application functionality
  So that I can ensure the application works correctly

  @smoke @example
  Scenario: Navigate to example website
    Given I am on the example homepage
    When I see the page title
    Then the page title should contain "Example Domain"

  @smoke @example
  Scenario: Verify page content
    Given I am on the example homepage
    When I check the page content
    Then I should see the heading "Example Domain"
    And I should see a paragraph with information

  @example @search
  Scenario: Click on more information link
    Given I am on the example homepage
    When I click on the "More information" link
    Then I should be redirected to a new page
