import AbstractEditRoute from 'hospitalrun/routes/abstract-edit-route';
import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';
export default AbstractEditRoute.extend({
  hideNewButton: true,
  newTitle: t('admin.payment_workflow.new_title'),
  editTitle: t('admin.payment_workflow.edit_title'),
  model: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      this.get('store').find('option', 'payment_workflow_options').then(function(addressOptions) {
        resolve(addressOptions);
      }, function() {
        var store = this.get('store');
        var newConfig = store.push(store.normalize('option', {
          id: 'payment_workflow_options',
          value: {
            admissionDepositRequired: false,
            followupPrepaymentRequired: false,
            labPrepaymentRequired: false,
            imagingPrepaymentRequired: false,
            medicationPrepaymentRequired: false
          }
        }));
        resolve(newConfig);
      }.bind(this));
    }.bind(this));
  }
});