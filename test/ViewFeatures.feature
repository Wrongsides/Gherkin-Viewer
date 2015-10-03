Feature: View a feature file
  As a Gherkin Viewer user
  I want my feature files to be displayed elegantly
  So that they are easier to understand and share

  Background:
    Given Ghrekin Viewer extention is installed
    And is enabled.

  Scenario Outline: viewing feature file
    Given the <keyword> is included in the feature file
    When the feature file is viewed
    Then the <keyword> will be <font> and <colour>

    Examples:
      | keyword      | font  | colour  |
      |  Background: |  H1   |  Blue   |
      |  Scenario:   |  H1   |  Red    |
      |  Given       |  H1   |  Red    |

  Scenario: ensure scenario outlines are formatted
    Given a Scenario Outline is included in the feature file
    When the feature file is viewed
    Then the outline will be highlighted
    And the examples grid will be displayed neatly

  Scenario: ensure cucumber spoken languages are suppored
    Given a feature file includes the # language: pl tag
    When the page is viewed
    Then the Polish keywords will be highlighted