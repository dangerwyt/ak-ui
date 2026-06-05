<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <aka-tooltip
        class="box-item"
        placement="top-start"
        content="Top Start prompts info"
      >
        <aka-button>top-start</aka-button>
      </aka-tooltip>
      <aka-tooltip
        class="box-item"
        placement="top"
        content="Top Center prompts info"
      >
        <aka-button>top</aka-button>
      </aka-tooltip>
      <aka-tooltip
        class="box-item"
        placement="top-end"
        content="Top Right prompts info"
      >
        <aka-button>top-end</aka-button>
      </aka-tooltip>
    </div>
    <div class="row">
      <aka-tooltip class="box-item" placement="left-start">
        <template #content>
          Left Top
          <br />
          prompts info
        </template>
        <aka-button>left-start</aka-button>
      </aka-tooltip>
      <aka-tooltip class="box-item" placement="right-start">
        <template #content>
          Right Top
          <br />
          prompts info
        </template>
        <aka-button>right-start</aka-button>
      </aka-tooltip>
    </div>
    <div class="row">
      <aka-tooltip class="box-item" placement="left">
        <template #content>
          Left Center
          <br />
          prompts info
        </template>
        <aka-button>left</aka-button>
      </aka-tooltip>
      <aka-tooltip class="box-item" placement="right">
        <template #content>
          Right Center
          <br />
          prompts info
        </template>
        <aka-button>right</aka-button>
      </aka-tooltip>
    </div>

    <div class="row">
      <aka-tooltip class="box-item" placement="left-end">
        <template #content>
          Left Bottom
          <br />
          prompts info
        </template>
        <aka-button>left-end</aka-button>
      </aka-tooltip>
      <aka-tooltip class="box-item" placement="right-end">
        <template #content>
          Right Bottom
          <br />
          prompts info
        </template>
        <aka-button>right-end</aka-button>
      </aka-tooltip>
    </div>
    <div class="row center">
      <aka-tooltip
        class="box-item"
        placement="bottom-start"
        content="Bottom Left prompts info"
      >
        <aka-button>bottom-start</aka-button>
      </aka-tooltip>
      <aka-tooltip
        class="box-item"
        placement="bottom"
        content="Bottom Center prompts info"
      >
        <aka-button>bottom</aka-button>
      </aka-tooltip>
      <aka-tooltip
        class="box-item"
        placement="bottom-end"
        content="Bottom Right prompts info"
      >
        <aka-button>bottom-end</aka-button>
      </aka-tooltip>
    </div>
  </div>
</template>

<style>
  .tooltip-base-box {
    width: 600px;
  }
  .tooltip-base-box .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tooltip-base-box .center {
    justify-content: center;
    gap: 12px;
  }
  .tooltip-base-box .box-item {
    margin-top: 10px;
  }
</style>
