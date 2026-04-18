const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;
const { BooleanField, NumberField } = foundry.data.fields;

/**
 * @typedef {object} AwardConfig
 * @property {number} xp          XP to award.
 * @property {number} gp          GP to award.
 * @property {number} sp          SP to award.
 * @property {number} cp          CP to award.
 * @property {boolean} each       Denotes whether the award is for each character (true) or to divide amongst the character (false).
 */

export default class AwardFormulaDialog extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["award-formula-dialog"],
    tag: "form",
    form: {
      handler: AwardFormulaDialog.handleFormSubmit,
      submitOnChange: true,
      closeOnSubmit: false,
    },
    position: {
      width: 400,
      height: "auto",
    },
    window: {
      title: "DND.MENU.AWARD.TITLE",
      contentClasses: ["standard-form"],
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static PARTS = {
    config: {
      template: "modules/dnd-easy-reference/templates/award/config.hbs",
    },
    footer: {
      template: "templates/generic/form-footer.hbs",
    },
  };

  /* -------------------------------------------------- */

  /**
   * @type {AwardFormulaModel}
   */
  #model = new AwardFormulaModel();

  /* -------------------------------------------------- */

  /**
   * Resulting configuration.
   * @type {object|null}
   */
  #config = null;
  get config() {
    return this.#config;
  }

  /* -------------------------------------------------- */

  /**
   * Final text to inject.
   * @type {string|null}
   */
  get #text() {
    const parts = [];
    
    if (this.#model.xp > 0) {
      parts.push(`${this.#model.xp}xp`);
    }
    
    const currency = [];
    if (this.#model.gp > 0) currency.push(`${this.#model.gp}gp`);
    if (this.#model.sp > 0) currency.push(`${this.#model.sp}sp`);
    if (this.#model.cp > 0) currency.push(`${this.#model.cp}cp`);
    
    if (currency.length > 0) {
      parts.push(currency.join(" "));
    }
    
    if (parts.length === 0) return null;
    
    let command = parts.join(" ");
    
    if (this.#model.each) {
      command += " each";
    }
    
    return `[[/award ${command}]]`;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = {};

    context.xp = {
      field: this.#model.schema.getField("xp"),
      value: this.#model.xp,
    };

    context.gp = {
      field: this.#model.schema.getField("gp"),
      value: this.#model.gp,
    };

    context.sp = {
      field: this.#model.schema.getField("sp"),
      value: this.#model.sp,
    };

    context.cp = {
      field: this.#model.schema.getField("cp"),
      value: this.#model.cp,
    };

    context.each = {
      field: this.#model.schema.getField("each"),
      value: this.#model.each,
    };

    context.buttons = [
      {
        type: "submit",
        icon: "fa-solid fa-check",
        label: "Confirm",
      },
    ];

    return context;
  }

  /* -------------------------------------------------- */
  /* Event Handlers                                     */
  /* -------------------------------------------------- */

  /**
   * @this {AwardFormulaDialog}
   * @param {SubmitEvent} event
   * @param {HTMLFormElement} form
   * @param {FormDataExtended} formData
   * @param {object} submitOptions
   */
  static handleFormSubmit(event, form, formData, submitOptions) {
    switch (event.type) {
      case "change":
        this.#model.updateSource(formData.object);
        break;
      case "submit":
        this.#config = this.#text;
        this.close();
        break;
    }
  }

  /* -------------------------------------------------- */
  /* Factory methods                                    */
  /* -------------------------------------------------- */

  /**
   * @param {object} [options]
   * @returns {Promise<string|null>}      The text, or `null`.
   */
  static async create(options = {}) {
    const { promise, resolve } = Promise.withResolvers();
    const application = new this(options);
    
    if (options.initialData) {
      const dataToApply = foundry.utils.deepClone(options.initialData);
      application.#model.updateSource(dataToApply);
    }

    application.addEventListener("close", () => resolve(application.config), {
      once: true,
    });
    application.render({ force: true });
    return promise;
  }
}

/* -------------------------------------------------- */

/**
 * The data model representing the form's data.
 */
class AwardFormulaModel extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      xp: new NumberField({
        label: "DND.DIALOG.XP",
        min: 0,
        integer: true,
        initial: 0,
      }),
      gp: new NumberField({
        label: "DND.DIALOG.GOLD",
        min: 0,
        integer: true,
        initial: 0,
      }),
      sp: new NumberField({
        label: "DND.DIALOG.SILVER",
        min: 0,
        integer: true,
        initial: 0,
      }),
      cp: new NumberField({
        label: "DND.DIALOG.COPPER",
        min: 0,
        integer: true,
        initial: 0,
      }),
      each: new BooleanField({
        label: "DND.DIALOG.EACH",
        initial: false,
      }),
    };
  }
}