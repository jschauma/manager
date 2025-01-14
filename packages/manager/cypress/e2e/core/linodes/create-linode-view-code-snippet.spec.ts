/**
 * @file Linode Create view code snippets tests.
 */

import { ui } from 'support/ui';

import { randomLabel, randomString } from 'support/util/random';
import { linodeCreatePage } from 'support/ui/pages';
import {
  mockAppendFeatureFlags,
  mockGetFeatureFlagClientstream,
} from 'support/intercepts/feature-flags';

import { makeFeatureFlagData } from 'support/util/feature-flags';

describe('Create Linode', () => {
  /*
   * tests for create Linode flow to validate code snippet modal.
   */
  describe('Create Linode flow with apicliDxToolsAdditions enabled', () => {
    // Enable the `apicliDxToolsAdditions` feature flag.
    // TODO Delete these mocks once `apicliDxToolsAdditions` feature flag is retired.
    beforeEach(() => {
      mockAppendFeatureFlags({
        apicliDxToolsAdditions: makeFeatureFlagData(true),
        linodeCreateRefactor: makeFeatureFlagData(true),
      });
      mockGetFeatureFlagClientstream();
    });
    it(`view code snippets in create linode flow`, () => {
      const linodeLabel = randomLabel();
      const rootPass = randomString(32);

      cy.visitWithLogin('/linodes/create');

      // Set Linode label, distribution, plan type, password, etc.
      linodeCreatePage.setLabel(linodeLabel);
      linodeCreatePage.selectImage('Debian 11');
      linodeCreatePage.selectRegionById('us-east');
      linodeCreatePage.selectPlan('Shared CPU', 'Nanode 1 GB');
      linodeCreatePage.setRootPassword(rootPass);

      // View Code Snippets and confirm it's provisioned as expected.
      ui.button
        .findByTitle('Create using command line')
        .should('be.visible')
        .should('be.enabled')
        .click();

      ui.dialog
        .findByTitle('Create Linode')
        .should('be.visible')
        .within(() => {
          ui.tabList
            .findTabByTitle('cURL')
            .should('be.visible')
            .should('be.enabled');

          ui.tabList.findTabByTitle('Linode CLI').should('be.visible').click();

          // Validate Integrations
          ui.tabList
            .findTabByTitle('Integrations')
            .should('be.visible')
            .click();

          // Validate Ansible and links
          ui.autocomplete.find().click();

          ui.autocompletePopper
            .findByTitle('Ansible')
            .should('be.visible')
            .click();
          cy.contains(
            'a',
            'Getting Started With Ansible: Basic Installation and Setup'
          ).should('be.visible');
          cy.contains('a', 'Linode Cloud Instance Module').should('be.visible');
          cy.contains('a', 'Manage Personal Access Tokens').should(
            'be.visible'
          );
          cy.contains('a', 'Best Practices For Ansible').should('be.visible');
          cy.contains(
            'a',
            'Use the Linode Ansible Collection to Deploy a Linode'
          ).should('be.visible');

          // Validate Terraform and links
          ui.autocomplete.find().click();
          ui.autocompletePopper
            .findByTitle('Terraform')
            .should('be.visible')
            .click();
          cy.contains('a', `A Beginner's Guide to Terraform`).should(
            'be.visible'
          );
          cy.contains('a', 'Install Terraform').should('be.visible');
          cy.contains('a', 'Manage Personal Access Tokens').should(
            'be.visible'
          );
          cy.contains('a', 'Use Terraform With Linode Object Storage').should(
            'be.visible'
          );
          cy.contains(
            'a',
            'Use Terraform to Provision Infrastructure on Linode'
          ).should('be.visible');
          cy.contains(
            'a',
            'Import Existing Infrastructure to Terraform'
          ).should('be.visible');

          // Validate SDK's tab
          ui.tabList.findTabByTitle(`SDK's`).should('be.visible').click();

          ui.autocomplete.find().click();

          // Validate linodego and links
          ui.autocompletePopper
            .findByTitle('Go (linodego)')
            .should('be.visible')
            .click();
          cy.contains('a', 'Go client for Linode REST v4 API').should(
            'be.visible'
          );
          cy.contains('a', 'Linodego Documentation').should('be.visible');

          ui.autocomplete.find().click();

          // Validate Python API4 and links
          ui.autocompletePopper
            .findByTitle('Python (linode_api4-python)')
            .should('be.visible')
            .click();

          cy.contains(
            'a',
            'Official python library for the Linode APIv4 in python'
          ).should('be.visible');
          cy.contains('a', 'linode_api4-python Documentation').should(
            'be.visible'
          );

          ui.button
            .findByTitle('Close')
            .should('be.visible')
            .should('be.enabled')
            .click();
        });
    });
  });
  describe('Create Linode flow with apicliDxToolsAdditions disabled', () => {
    // Enable the `apicliDxToolsAdditions` feature flag.
    // TODO Delete these mocks and test once `apicliDxToolsAdditions` feature flag is retired.
    beforeEach(() => {
      mockAppendFeatureFlags({
        apicliDxToolsAdditions: makeFeatureFlagData(false),
        linodeCreateRefactor: makeFeatureFlagData(true),
      });
      mockGetFeatureFlagClientstream();
    });
    it(`view code snippets in create linode flow`, () => {
      const linodeLabel = randomLabel();
      const rootPass = randomString(32);

      cy.visitWithLogin('/linodes/create');

      // Set Linode label, distribution, plan type, password, etc.
      linodeCreatePage.setLabel(linodeLabel);
      linodeCreatePage.selectImage('Debian 11');
      linodeCreatePage.selectRegionById('us-east');
      linodeCreatePage.selectPlan('Shared CPU', 'Nanode 1 GB');
      linodeCreatePage.setRootPassword(rootPass);

      // View Code Snippets and confirm it's provisioned as expected.
      ui.button
        .findByTitle('Create using command line')
        .should('be.visible')
        .should('be.enabled')
        .click();

      ui.dialog
        .findByTitle('Create Linode')
        .should('be.visible')
        .within(() => {
          ui.tabList
            .findTabByTitle('cURL')
            .should('be.visible')
            .should('be.enabled');

          ui.tabList.findTabByTitle('Linode CLI').should('be.visible').click();

          // Validate Integrations
          ui.tabList.findTabByTitle('Integrations').should('not.exist');
          // Validate Integrations
          ui.tabList.findTabByTitle(`SDK's`).should('not.exist');

          ui.button
            .findByTitle('Close')
            .should('be.visible')
            .should('be.enabled')
            .click();
        });
    });
  });
});
