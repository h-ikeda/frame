<template>
    <div class="mdc-dialog__surface">
        <header class="mdc-dialog__header">
            <h2 class="mdc-dialog__header__title"></h2>
        </header>
        <section class="mdc-dialog__body">
        </section>
        <footer class="mdc-dialog__footer">
            <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel"></button>
            <button class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">OK</button>
        </footer>
    </div>
</template>

<style scoped>
    .mdc-dialog__footer__button--cancel {
        display: none;
    }
</style>